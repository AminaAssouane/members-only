const { Client } = require("pg");

// CREATE TABLES
const createUsers =
  "CREATE TABLE users (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, firstname VARCHAR (255), lastname VARCHAR (255), username VARCHAR (255), password TEXT, is_member BOOLEAN DEFAULT FALSE, admin BOOLEAN DEFAULT FALSE)";
const createMessages =
  "CREATE TABLE messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, user_id INTEGER, title VARCHAR (255), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, text TEXT, FOREIGN KEY (user_id) REFERENCES users(id) )";

// POPULATE TABLES
// const populateUsers = "INSERT INTO users (id, first name, ";
// const populateMessages;

async function main() {
  const client = new Client({
    connectionString: "postgresql://aminaassouane:null@localhost:5432/members",
  });
  try {
    await client.connect();
    console.log("Connected to database.");
    await client.query("DROP TABLE IF EXISTS users;");
    await client.query("DROP TABLE IF EXISTS messages;");
    console.log("Tables reset.");
    await client.query(createUsers);
    await client.query(createMessages);
    console.log("Tables created.");
    await client.query(populateUsers);
    await client.query(populateMessages);
    console.log("Tables populated.");
  } catch (error) {
    console.error("Error occured : ", error);
  } finally {
    await client.end();
    console.log("Done.");
  }
}

main();
