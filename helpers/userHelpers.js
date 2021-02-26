users = [];

module.exports = {
  addUsers(id, name, room) {
    return new Promise((resolve, reject) => {
      name = name.trim().toLowerCase();
      room = room.trim().toLowerCase();
      const existingUser = users.find(
        (user) => user.room === room && user.name === name
      );
      if (existingUser) {
        console.log("User name already taken");
        reject({ err: "Username already taken!!" });
      } else {
        const user = { id, name, room };
        users.push(user);
        resolve(user);
      }
    });
  },
  removeUser(id) {
    return new Promise((resolve, reject) => {
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        users.splice(index, 1)[0];
        resolve();
      }
    });
  },
  getUser(id) {
    return new Promise((resolve, reject) => {
      const user = users.find((u) => u.id === id);
      console.log("prisjkyi");
      console.log(users);
      resolve(user);
    });
  },
  getUserRoom(room) {
    return new Promise((resolve, reject) => {
      users.filter((user) => user.room === room);
    });
  },
};
