const user = knex => t => {
  t.string("user_id")
    .notNull()
    .primary();
  t.timestamp("user_created_at").defaultTo(knex.fn.now());
  t.timestamp("user_updated_at").defaultTo(knex.fn.now());
  t.string("user_discord_id");
  t.string("user_name").notNull();
  t.string("user_surname").notNull();
  t.string("user_nick");
  t.string("user_email").notNull();
  t.string("user_phone");
};

const team = knex => t => {
  t.string("team_id")
    .notNull()
    .primary();
  t.timestamp("team_created_at").defaultTo(knex.fn.now());
  t.timestamp("team_updated_at").defaultTo(knex.fn.now());
  t.string("team_name").notNull();
  t.string("team_discord_id").notNull();
  t.integer("team_level");
};

const user_team = knex => t => {
  t.string("user_id").notNull();
  t.string("team_id").notNull();
  t.foreign("user_id")
    .references("user_id")
    .inTable("user");
  t.foreign("team_id")
    .references("team_id")
    .inTable("team");
  t.primary(["user_id", "team_id"]);
};

const event = knex => t => {
  t.increments("event_id")
    .unsigned()
    .primary();
  t.timestamp("event_created_at").defaultTo(knex.fn.now());
  t.timestamp("event_updated_at").defaultTo(knex.fn.now());
  t.date("event_date")
    .notNull()
    .defaultTo(knex.fn.now());
  t.string("user_id");
  t.string("team_id");
  t.int("event_keys").notNull();
  t.text("event_reason");
  t.text("event_comment");
  t.string("event_author_id").notNull();
  t.foreign("event_author_id")
    .references("user_id")
    .inTable("user");
  t.foreign("user_id")
    .references("user_id")
    .inTable("user");
  t.foreign("team_id")
    .references("team_id")
    .inTable("team");
};

const attendance = knex => t => {
  t.increments("attendance_id")
    .unsigned()
    .primary();
  t.timestamp("attendance_created_at").defaultTo(knex.fn.now());
  t.timestamp("attendance_updated_at").defaultTo(knex.fn.now());
  t.integer("user_id").unsigned();
  t.date("attendance_date")
    .notNull()
    .defaultTo(knex.fn.now());
  t.text("attendance_note");
  t.boolean("attendance_excused")
    .notNull()
    .defaultTo(false);
  t.float("attendance_time_in_delta").notNull();
  t.float("attendance_time_out_delta").notNull();
  t.string("attendance_author_id").notNull();
  t.foreign("attendance_author_id")
    .references("user_id")
    .inTable("user");
  t.foreign("user_id")
    .references("user_id")
    .inTable("user");
};

const resource = knex => t => {
  t.string("resource_id")
    .notNull()
    .primary();
  t.string("resource_url");
  t.string("resource_origin");
  t.timestamp("resource_created_at").defaultTo(knex.fn.now());
  t.timestamp("resource_updated_at").defaultTo(knex.fn.now());
  t.string("resource_description");
};

const tag = knex => t => {
  t.string("tag_id")
    .notNull()
    .primary();
  t.timestamp("tag_created_at").defaultTo(knex.fn.now());
  t.timestamp("tag_updated_at").defaultTo(knex.fn.now());
  t.string("tag_name");
};

const tag_resource = knex => t => {
  t.string("tag_id").notNull();
  t.string("resource_id").notNull();
  t.foreign("tag_id")
    .references("tag_id")
    .inTable("tag");
  t.foreign("resource_id")
    .references("resource_id")
    .inTable("resource");
  t.primary(["tag_id", "resource_id"]);
};

exports.up = knex =>
  Promise.resolve()
    .then(() => knex.schema.createTable("user", user(knex)))
    .then(() => knex.schema.createTable("team", team(knex)))
    .then(() => knex.schema.createTable("user_team", user_team(knex)))
    .then(() => knex.schema.createTable("event", event(knex)))
    .then(() => knex.schema.createTable("attendance", attendance(knex)))
    .then(() => knex.schema.createTable("resource", resource(knex)))
    .then(() => knex.schema.createTable("tag", tag(knex)))
    .then(() => knex.schema.createTable("tag_resource", tag_resource(knex)));

exports.down = knex =>
  Promise.resolve()
    .then(() => knex.schema.dropTable("user"))
    .then(() => knex.schema.dropTable("team"))
    .then(() => knex.schema.dropTable("user_team"))
    .then(() => knex.schema.dropTable("event"))
    .then(() => knex.schema.dropTable("attendance"))
    .then(() => knex.schema.dropTable("resource"))
    .then(() => knex.schema.dropTable("tag"))
    .then(() => knex.schema.dropTable("tag_resource"));
