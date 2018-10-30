const knex = require("./knex");
const { config } = knex;

module.exports = () => {
  /** /
  if (process.env.ENVIRONMENT !== "production" && config.client === "sqlite3") {
    const filename = config.connection.filename;
    try {
      require("fs").unlinkSync(filename);
      console.log("deleted previous file `" + filename + "`");
    } catch (e) {
      console.log("could not delete previous file `" + filename + "`");
    }
  }
  /**/

  return knex.migrate
    .latest()
    .then(() => knex.seed.run())
    .then(() => console.log("db ready"))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};
