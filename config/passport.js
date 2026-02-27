const passport = require("passport");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await db.findUserByUsername(username);
    if (!user) return done(null, false, { message: "Incorrect username" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return done(null, false, { message: "Incorrect password" });

    done(null, user);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await db.findById(id);
  done(null, user);
});
