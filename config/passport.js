const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await db.findUserByUsername(username);

    if (!user) return done(null, false, { message: "Incorrect username" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return done(null, false, { message: "Incorrect password" });

    done(null, user);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const { rows } = await db.findById(id);
  const user = rows[0];
  done(null, user);
});
