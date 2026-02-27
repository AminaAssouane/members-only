function index(req, res) {
  res.render("index");
}

function signUp(req, res) {
  res.render("sign-up");
}

module.exports = {
  index,
  signUp,
};
