function index(req, res) {
  res.render("index");
}

function signUp(req, res) {
  res.render("sign-up");
}

function signUpPost(req, res) {
  const { firstName, lastName, username, password, confirmPassword } = req.body;
}

module.exports = {
  index,
  signUp,
  signUpPost,
};
