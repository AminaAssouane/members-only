function index(req, res) {
  res.render("index");
}

function signup(req, res) {
  res.render("sign-up");
}

module.exports = {
  index,
  signup,
};
