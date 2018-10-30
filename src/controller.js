const prepare_knex = require("./db");
const random = require("random");
const Sherlock = require("sherlockjs");
const randomFromArr = require("./utils/randomFromArr");
//const log = (thing) => {console.log(thing); return thing;}

const ok = thing => Promise.resolve(thing);
const no = message => Promise.reject(new Error(message));

module.exports = () =>
  prepare_knex().then(knex => {
    /**
     * Just a shortcut to avoid re-writing the complex part
     * of the  query all the time
     */
    const prepare_user_query = () =>
      knex("user")
        .innerJoin("user_team", { "user.user_id": "user_team.user_id" })
        .innerJoin("team", { "team.team_id": "user_team.team_id" })
        .select();

    const methods = {
      /**
       * returns all users
       */
      user_list: ({ page = 0 }) =>
        prepare_user_query()
          .limit(50)
          .offset(page * 50)
          .then(format_results),

      /**
       * gets a user by SQL id or discord id
       */
      user_by_id: ({ id, discord_id }) =>
        prepare_user_query()
          .where(
            id ? { "user.user_id": id } : { "user.user_discord_id": discord_id }
          )
          .then(format_results),

      /**
       * gets a random user (optionally from a specific team)
       */
      random: props => {
        if (
          !props ||
          typeof props.type === "undefined" ||
          props.type === "dice"
        ) {
          return ok(random.int(1, 6));
        }
        if (props.type === "list") {
          const words =
            typeof props.list === "string"
              ? props.list.split(/\s+/)
              : props.list;
          if (!props.list || props.list.length < 2) {
            return no("you need at least 2 items");
          }
          return ok(randomFromArr(words));
        }
        if (props.type === "number") {
          const min = (props.min && parseFloat(props.min)) || 0;
          const max = (props.max && parseFloat(props.max)) || 100;
          return ok(random.int(min, max));
        }
        if (props.type === "user") {
          if (props.id || props.discord_id) {
            if (props.id && (props.id === "all" || props.id === "any")) {
              return methods.user_list(props).then(pick_random_user);
            }
            if (props.list) {
              return methods.team_by_id(props).then(data => {
                const arr = [];
                for (let i = 0; i < 1000; i++) {
                  const user = pick_random_user(data);
                  if (!user.id) {
                    continue;
                  }
                  arr.push(i + ":" + user.id);
                }
                return { arr };
              });
            }
            return methods.team_by_id(props).then(pick_random_user);
          }
        }
        if (props.type === "team") {
          return methods.teams().then(pick_random_team);
        }
        return no("random what?");
      },

      /**
       * Returns a team
       */
      team_by_id: ({ id, discord_id }) =>
        prepare_user_query()
          .where(
            id ? { "team.team_id": id } : { "team.team_discord_id": discord_id }
          )
          .then(format_results),

      teams: () =>
        knex("team")
          .select()
          .then(format_results),
      /**
       * Lists the last few events
       */
      event_list: ({ page = 0, limit = 4 }) =>
        knex("event")
          .leftJoin("team", { "team.team_id": "event.team_id" })
          .leftJoin("user", { "user.user_id": "event.user_id" })
          .orderBy("event.event_date", "desc")
          .limit(limit)
          .offset(page * limit)
          .select()
          .then(format_results),

      /**
       * Gives the total number of keys
       */
      keys_total: () =>
        knex("event")
          .sum({ total: "event_keys" })
          .then(([result]) => result),

      /**
       * Adds an event
       */
      event_add: props => {
        knex("event")
          .returning("id")
          .insert(props);
      },

      attendance_list: ({ start = daysAgo(5), end = daysAgo(-1) }) => {
        const dateFormat = /\d\d\d\d-\d\d-\d+/;
        if (!dateFormat.test(start) || !dateFormat.test(end)) {
          return no("dates are invalid");
        }
        return knex("attendance")
          .leftJoin("user", { "user.user_id": "attendance.user_id" })
          .where("attendance.attendance_date", ">=", start)
          .andWhere("attendance.attendance_date", "<=", end)
          .orderBy("attendance.attendance_date")
          .select()
          .then(format_attendance);
        //.then(format_results),
      },

      resource_list: ({ tag }) => {
        const query = knex("resource")
          .select([
            "resource.resource_id",
            "resource.resource_description",
            knex.raw("group_concat(tag.tag_name) as resource_tags")
          ])
          .leftJoin("tag_resource", {
            "resource.resource_id": "tag_resource.resource_id"
          })
          .leftJoin("tag", { "tag.tag_id": "tag_resource.tag_id" })
          .groupBy("resource.resource_id");
        const tags = tag ? tag.split(/\+/) : "";
        const where = tags.length
          ? tags.map(() => "`tag`.`tag_id` LIKE ?").join(" OR ")
          : "";
        return (where
          ? query.whereRaw(where, tags.map(t => `%${t}%`))
          : query
        ).then(received_rows => {
          if (!received_rows.length) {
            return no("no resources were found for `" + tags.join("`,`") + "`");
          }
          const resource = { by_id: {}, items: [] };
          received_rows.forEach(row => extract_resource(resource, row));

          return { resource };
        });
      },

      tag_list: ({ tag }) => {
        const query = knex("tag")
          .select([
            "tag.tag_name",
            "tag.tag_id",
            knex.raw("count(tag.tag_id) as tag_count"),
            knex.raw("group_concat(tag_resource.resource_id) as tag_urls")
          ])
          .join("tag_resource", { "tag.tag_id": "tag_resource.tag_id" })
          .groupBy("tag.tag_id")
          .orderBy("tag_count", "desc");
        return (tag ? query.where({ "tag.tag_id": tag }) : query).then(
          received_rows => {
            if (!received_rows.length) {
              return no("no tags were found");
            }

            const tags = { by_id: {}, items: [] };

            received_rows.forEach(row => extract_tag(tags, row));

            return { tags };
          }
        );
      }
    };

    return methods;
  });

const extract_object_from_row = (needle, additional = () => ({})) => (
  cache,
  row
) => {
  const idKey = needle + "id";
  const id = row[idKey];
  if (!id) {
    return null;
  }
  if (!(id in cache.by_id)) {
    const extracted_props = {};
    Object.keys(row).forEach(prop => {
      if (prop.indexOf(needle) === 0) {
        extracted_props[prop.replace(needle, "")] = row[prop];
      }
    });
    const item = {
      ...extracted_props,
      ...additional(extracted_props)
    };
    cache.by_id[id] = item;
    cache.items.push(id);
  }
  return cache.by_id[id];
};

/**
 * Extracts a user, if it exists, from a row
 * @param { object } users on object to store the user in
 * @param { object } row  the row as returned from the database
 * @return { object } the user object
 */
const extract_user = extract_object_from_row("user_", () => ({
  teams: [],
  events: [],
  attendance: []
}));

/**
 * Extracts a tag, if it exists, from a row
 * @param { object } tags on object to store the user in
 * @param { object } row  the row as returned from the database
 * @return { object } the user object
 */
const extract_tag = extract_object_from_row("tag_", tag => ({
  urls: tag.urls.split(",").sort()
}));

/**
 * Extracts a resource, if it exists, from a row
 * @param { object } resources on object to store the user in
 * @param { object } row  the row as returned from the database
 * @return { object } the user object
 */
const extract_resource = extract_object_from_row("resource_", res => ({
  tags: res.tags.split(",").sort()
}));

/**
 * Extracts a team, if it exists, from a row
 * @param { object } teams on object to store the team in
 * @param { object } row  the row as returned from the database
 * @return { object } the team object
 */
const extract_team = extract_object_from_row("team_", () => ({
  users: [],
  events: []
}));

/**
 * Extracts an event, if it exists, from a row
 * @param { object } events on object to store the event in
 * @param { object } row  the row as returned from the database
 * @return { object } the event object
 */
const extract_event = extract_object_from_row("event_", () => ({
  user: null,
  team: null
}));

/**
 * Extracts an attendance event, if it exists, from a row
 * @param { object } attendances on object to store the event in
 * @param { object } row  the row as returned from the database
 * @return { object } the attendance object
 */
const extract_attendance = extract_object_from_row("attendance_", () => ({
  user: null
}));

const format_attendance = returnedRows => {
  if (!returnedRows.length) {
    throw new Error("no rows returned");
  }

  const users = { by_id: {}, items: [] };
  const attendances = { by_id: {}, items: [] };

  returnedRows.forEach(row => {
    const { user_id, attendance_id } = row;
    const user = extract_user(users, row);
    user.attendance.push(attendance_id);
    const date = extract_attendance(attendances, row);
    date.user = user_id;
  });

  return { attendances, users };
};

/**
 * Formats the rows returned from the database in a more useful
 * set of objects
 * @param { object } returnedRows
 */
const format_results = returnedRows => {
  if (!returnedRows.length) {
    throw new Error("no rows returned");
  }

  const teams = { by_id: {}, items: [] };
  const users = { by_id: {}, items: [] };
  const events = { by_id: {}, items: [] };

  returnedRows.forEach(row => {
    const { team_id, user_id, event_id } = row;

    const user = !!user_id && extract_user(users, row);
    if (user) {
      !!team_id && user.teams.push(team_id);
      !!event_id && user.events.push(event_id);
    }

    const team = !!team_id && extract_team(teams, row);
    if (team) {
      !!user_id && team.users.push(user_id);
      !!event_id && team.events.push(event_id);
    }

    const event = !!event_id && extract_event(events, row);
    if (event) {
      event.user = user_id;
      event.team = team_id;
    }
  });

  const results = {};
  if (users.items.length) {
    results.users = users;
  }
  if (teams.items.length) {
    results.teams = teams;
  }
  if (events.items.length) {
    results.events = events;
  }
  return results;
};

/**
 * Returns one random user from a set of formatted results
 * @param {*} results
 */
const pick_random_user = results => {
  const userId = randomFromArr(results.users.items);
  const user = results.users.by_id[userId];
  //const items = [userId];
  //const by_id = { [userId]: user };
  //results.users = { by_id, items };
  return user;
};

const pick_random_team = results => {
  const teamId = randomFromArr(results.teams.items);
  const team = results.teams.by_id[teamId];
  //const items = [userId];
  //const by_id = { [userId]: user };
  //results.teams = { by_id, items };
  return team;
};

/**
 * transforms a date into YYYY-MM-dd,
 * taking into account your timezone
 * see: https://stackoverflow.com/a/11172083
 * @param {Date} date
 */
const dateToString = date => {
  if (date === "now") {
    date = new Date();
  }
  const local = new Date(date);
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

const daysAgo = (n = 5) => {
  const now = new Date();
  if (n === 0) {
    return dateToString(now);
  }
  now.setDate(now.getDate() - n);
  return dateToString(now);
};

/**
 * Extracts string dates from provided strings.
 * Uses either an object with an expression ("in the last 2 days")
 * or a start and end date that can be parsed by the JS native Date
 * @param { {timeframe, start, end, title } } options
 */
const getDates = ({ timeframe, start, end, title }) => {
  const now = dateToString(new Date());

  if (!start && !timeframe) {
    return new Error("no date provided");
  }

  if (start) {
    if (start) {
      start = dateToString(start);
    }
    if (end) {
      end = dateToString(end);
    } else {
      end = dateToString(now);
    }
    return { start, end, title };
  }
  if (timeframe) {
    const { startDate, endDate, title } = Sherlock.parse(timeframe);
    if (!startDate && !endDate) {
      return new Error("could not parse any date");
    }
    if (startDate && endDate) {
      start = dateToString(startDate);
      end = dateToString(endDate);
    }
    if (!endDate) {
      start = dateToString(startDate);
      end = now;
    }

    if (!startDate) {
      end = dateToString(endDate);
      start = now;
    }

    return { start, end, title };
  }
};
