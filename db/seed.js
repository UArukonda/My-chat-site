const format = require("pg-format");
const db = require("./index.js");

const seed = ({ users, chatroom_members, chatrooms, messages }) => {
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
    })
    .then(() => {
      return db.query(
        format(
          "INSERT INTO users(username, email, password, created_at, last_login ) VALUES %L",
          formattedUserData(users)
        )
      );
    })
    .then(() => {
      return db.query(
        format(
          "INSERT INTO chatrooms(room_name, created_by, created_at) VALUES %L",
          formattedChatroomData(chatrooms)
        )
      );
    })
    .then(() => {
      return db.query(
        format(
          "INSERT INTO messages(sender_id, chatroom_id, message_text, sent_at) VALUES %L",
          formattedMessageData(messages)
        )
      );
    });
};

const formattedUserData = (users) => {
  const userData = [];
  for (const user of users) {
    userData.push(Object.values(user));
  }
  return userData;
};

const formattedChatroomData = (chatrooms) => {
  const chatroomData = [];
  for (const chatroom of chatrooms) {
    chatroomData.push(Object.values(chatroom));
  }
  return chatroomData;
};

const formattedMessageData = (messages) => {
  const messageData = [];
  for (const message of messages) {
    messageData.push(Object.values(message));
  }
  return messageData;
};

module.exports = { seed, formattedUserData };
