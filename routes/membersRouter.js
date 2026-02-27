const { Router } = require("express");
const membersRouter = Router();

membersRouter.get("/", (req, res) => {
  res.send("Index");
});

module.exports = membersRouter;
