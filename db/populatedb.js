const { Client } = require("pg");

// CREATE TABLES
const createUsers =
  "CREATE TABLE users (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, firstname VARCHAR (255), lastname VARCHAR (255), username VARCHAR (255) UNIQUE NOT NULL, password TEXT NOT NULL, is_member BOOLEAN DEFAULT FALSE, admin BOOLEAN DEFAULT FALSE)";
const createMessages =
  "CREATE TABLE messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, user_id INTEGER NOT NULL, title VARCHAR (255) NOT NULL, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, text TEXT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id) )";

async function main() {
  const client = new Client({
    connectionString: "postgresql://aminaassouane@localhost:5432/members",
  });
  try {
    await client.connect();
    console.log("Connected to database.");
    await client.query("DROP TABLE IF EXISTS messages;");
    await client.query("DROP TABLE IF EXISTS users;");
    console.log("Tables reset.");
    await client.query(createUsers);
    await client.query(createMessages);
    console.log("Tables created.");
  } catch (error) {
    console.error("Error occured : ", error);
  } finally {
    await client.end();
    console.log("Done.");
  }
}

main();
