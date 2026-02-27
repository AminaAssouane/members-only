const { Router } = require("express");
const membersRouter = Router();

membersRouter.get("/", (req, res) => {
  res.render("index");
});
membersRouter.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

module.exports = membersRouter;
