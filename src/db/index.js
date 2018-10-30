const knex = require("./knex");

const ok = () => knex;

module.exports = refresh =>
  refresh
    ? require("./init")()
        .then(ok)
        .catch(err => {
          throw err;
        })
    : knex("tag")
        .select()
        .limit(1)
        .then(ok)
        .catch(_ => require("./init")())
        .then(ok)
        .catch(err => {
          throw err;
        });
