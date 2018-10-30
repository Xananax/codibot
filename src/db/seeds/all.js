const reset = (knex, name) => () =>
  knex(name)
    .del()
    .then(() => {
      const data = require("./tables/" + name);
      console.log("-------- inserting " + name + " ---");
      console.log(data);
      return knex(name).insert(data);
    });

exports.seed = knex =>
  Promise.resolve()
    .then(reset(knex, "user"))
    .then(reset(knex, "team"))
    .then(reset(knex, "user_team"))
    .then(reset(knex, "event"))
    .then(reset(knex, "attendance"))
    .then(reset(knex, "resource"))
    .then(reset(knex, "tag"))
    .then(reset(knex, "tag_resource"));
