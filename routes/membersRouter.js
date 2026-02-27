const { Router } = require("express");
const membersRouter = Router();
const membersController = require("../controllers/membersController");

membersRouter.get("/", membersController.index);

membersRouter.get("/sign-up", membersController.signUp);
membersRouter.post(
  "/sign-up",
  membersController.validateUser,
  membersController.signUpPost,
);

membersRouter.get("/join-club", membersController.joinClubGet);
membersRouter.post("/join-club", membersController.joinClubPost);

membersRouter.get("/login", membersController.loginGet);
membersRouter.post("/login", membersController.loginPost);

membersRouter.get("/new-message", membersController.newMessageGet);
membersRouter.post("/new-message", membersController.newMessagePost);

module.exports = membersRouter;
