const { Router } = require("express");
const membersRouter = Router();
const membersController = require("../controllers/membersController");

membersRouter.get("/", membersController.index);
membersRouter.get("/sign-up", membersController.signup);

module.exports = membersRouter;
