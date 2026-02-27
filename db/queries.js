const pool = require("./pool");

async function signUpPost(firstName, lastName, username, password) {
  await pool.query(
    "INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, password],
  );
}

module.exports = { signUpPost };
