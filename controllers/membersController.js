const db = require("../db/queries");

function index(req, res) {
  res.render("index");
}

function signUp(req, res) {
  res.render("sign-up");
}

async function signUpPost(req, res) {
  const { firstName, lastName, username, password, confirmPassword } = req.body;
  await db.signUpPost(firstName, lastName, username, password);
  res.redirect("/");
}

module.exports = {
  index,
  signUp,
  signUpPost,
};
