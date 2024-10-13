const { seed } = require("./seed.js");
const db = require("./index.js");
const data = require("./data/dev/index.js");

seed(data).then(() => {
  return db.end();
});
