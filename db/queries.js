const pool = require("./pool");

async function signUpPost(firstName, lastName, username, password, admin) {
  const isAdmin = admin ? true : false;
  await pool.query(
    "INSERT INTO users (firstname, lastname, username, password, admin) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, password, isAdmin],
  );
}

async function joinClub(username) {
  await pool.query("UPDATE users SET is_member = true WHERE username = $1", [
    username,
  ]);
}

async function findUserByUsername(username) {
  return await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
}

async function findById(id) {
  return await pool.query("SELECT * FROM users WHERE id = $1", [id]);
}

async function newMessage(user, title, text) {
  const timestamp = new Date();
  await pool.query(
    "INSERT INTO messages (user_id, title, timestamp, text) VALUES ($1, $2, $3, $4)",
    [user.id, title, timestamp, text],
  );
}

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages;");
  return rows;
}
async function getUser(id) {
  const { rows } = await pool.query(
    "SELECT username FROM users WHERE id = $1",
    [id],
  );
  return rows[0];
}

module.exports = {
  signUpPost,
  joinClub,
  findUserByUsername,
  findById,
  newMessage,
  getMessages,
  getUser,
};
