const express = require("express");
const app = express();
const membersRouter = require("./routes/membersRouter");
const path = require("node:path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/", membersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Listening on port : ${PORT}`);
});
