const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(3000, (error) => {
  if (error) throw error;
  console.log(`Listening on port : ${PORT}`);
});
