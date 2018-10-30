const Knex = require("knex");
const { join } = require("path");

const files = {
  migrations: {
    directory: join(__dirname, `/migrations`)
  },
  seeds: {
    directory: join(__dirname, `/seeds`)
  }
};

const rootDir = join(__dirname, "/../..");
const filename = join(rootDir, "db.sqlite3");

const development = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename
  },
  ...files
};

const production = {
  client: "postgresql",
  connection: {
    database: "my_db",
    user: "username",
    password: "password"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  },
  ...files
};

const environment = process.env.ENVIRONMENT || "development";

const config = environment === "production" ? production : development;

const knex = Knex(config);
knex.config = config;

module.exports = knex;
