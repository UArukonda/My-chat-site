const { formattedUserData } = require("../../db/seed.js");
const {
  users,
  chatroom_members,
  chatrooms,
  messages,
} = require("../../db/data/dev/index.js");

describe("formattedUserData", () => {
  test("should return [] when passed empty array", () => {
    expect(formattedUserData([])).toEqual([]);
  });
  test("should return array of arrays when passed user data", () => {
    let tempUserArr = [];
    for (const user of users) {
      tempUserArr.push(Object.values(user));
    }
    expect(formattedUserData(users)[0]).toEqual(tempUserArr[0]);
  });
});
