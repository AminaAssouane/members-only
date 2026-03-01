const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const secretCode = process.env.SESSION_SECRET;
let currentUsername;

// SIGN UP
function signUp(req, res) {
  res.render("sign-up", {
    oldData: {},
    errors: [],
  });
}

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name can not be empty.")
    .isAlpha()
    .withMessage("First name must only contain letters."),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name can not be empty.")
    .isAlpha()
    .withMessage("Last name must only contain letters."),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username can not be empty.")
    .isLength({ min: 6 })
    .withMessage("Username must be at least 6 characters."),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password cannot be empty.")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
];

async function signUpPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", {
      errors: errors.array(),
      oldData: req.body,
    });
  }
  try {
    const { firstName, lastName, username, password, admin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.signUpPost(firstName, lastName, username, hashedPassword, admin);
    currentUsername = username;
    res.redirect("/join-club");
  } catch (error) {
    console.error("Error occurred : ", error);
  }
}

// JOIN CLUB
function joinClubGet(req, res) {
  res.render("join-club");
}

async function joinClubPost(req, res) {
  if (req.body.secretCode === secretCode) {
    await db.joinClub(currentUsername);
    res.send("Joined the club!");
  }
}

// LOGIN
function loginGet(req, res) {
  res.render("login");
}
function loginPost(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, next);
}

// NEW MESSAGE
function newMessageGet(req, res) {
  res.render("new-message");
}

async function newMessagePost(req, res) {
  try {
    await db.newMessage(req.user, req.body.title, req.body.text);
    res.send("New message added");
  } catch (error) {
    console.error("Error occurred : ", error);
    res.redirect("/new-message");
  }
}

// HOME
async function getMessages(req, res) {
  const messages = await db.getMessages();

  const messagesWithUsers = await Promise.all(
    messages.map(async (message) => {
      const user = await db.getUser(message.user_id);
      return { ...message, user };
    }),
  );

  res.render("index", {
    user: req.user,
    messages: messagesWithUsers,
  });
}

// DELETE
async function deleteMessage(req, res) {
  await db.deleteMessage(req.body.messageId);
  res.redirect("/");
}

module.exports = {
  signUp,
  validateUser,
  signUpPost,
  joinClubGet,
  joinClubPost,
  loginGet,
  loginPost,
  newMessageGet,
  newMessagePost,
  getMessages,
  deleteMessage,
};
