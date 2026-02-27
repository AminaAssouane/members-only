const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "aminaassouane",
  database: "members",
  password: "",
  port: 5432,
});
