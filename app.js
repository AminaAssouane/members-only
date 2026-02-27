const express = require("express");
const app = express();
const membersRouter = require("./routes/membersRouter");
const path = require("node:path");
const passport = require("passport");
const session = require("express-session");
require("./config/passport");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", membersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Listening on port : ${PORT}`);
});
