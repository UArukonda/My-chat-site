const format = require("pg-format");
const db = require("./index.js");

const seed = () => {
  return db
    .query("DROP TABLE IF EXISTS chatroom_members")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS messages");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS chatrooms");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users");
    })
    .then(() => {
      return db.query(
        "CREATE TABLE users(user_id serial PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), created_at TIMESTAMP, last_login TIMESTAMP)"
      );
    })
    .then(() => {
      return db.query(
        "CREATE TABLE chatrooms(chatroom_id serial PRIMARY KEY, room_name VARCHAR(255), created_at TIMESTAMP, created_by INT REFERENCES users(user_id) ON DELETE SET NULL)"
      );
    })
    .then(() => {
      return db.query(
        "CREATE TABLE messages(message_id serial PRIMARY KEY, chatroom_id INT REFERENCES chatrooms(chatroom_id) ON DELETE SET NULL, sender_id INT REFERENCES users(user_id) ON DELETE SET NULL, message_text TEXT, sent_at TIMESTAMP)"
      );
    })
    .then(() => {
      return db.query(
        "CREATE TABLE chatroom_members(member_id serial PRIMARY KEY, user_id INT REFERENCES users(user_id) ON DELETE SET NULL, chatroom_id INT REFERENCES chatrooms(chatroom_id) ON DELETE SET NULL, joined_at TIMESTAMP, lastseen_at TIMESTAMP)"
      );
    });
};

module.exports = seed;
