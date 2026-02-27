const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

const secretCode = "galaxy";
let currentUsername;

function index(req, res) {
  res.render("index");
}

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
    const { firstName, lastName, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.signUpPost(firstName, lastName, username, hashedPassword);
    currentUsername = username;
    res.redirect("/join-club");
  } catch (error) {
    console.error("Error occurred : ", error);
  }
}

function joinClubGet(req, res) {
  res.render("join-club");
}

async function joinClubPost(req, res) {
  if (req.body.secretCode === secretCode) {
    await db.joinClub(currentUsername);
    res.send("Joined the club!");
  }
}

module.exports = {
  index,
  signUp,
  validateUser,
  signUpPost,
  joinClubGet,
  joinClubPost,
};
