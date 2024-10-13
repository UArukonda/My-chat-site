const seed = require("./seed.js");
const db = require("./index.js");

seed().then(() => {
  return db.end();
});
