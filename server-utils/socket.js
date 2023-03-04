const userData = [];

const addUser = (userId, socketId) => {
  const user = userData.find((user) => user.userId === userId);

  if (user && user.socketId === socketId) {
    return userData;
  } else {
    if (user && user.socketId !== socketId) {
      removeUser(user.socketId);
    }
    const newUser = { userId, socketId };
    userData.push(newUser);
    return userData;
  }
};

const removeUser = (socketId) => {
  const index = userData.map((user) => user.socketId).indexOf(socketId);
  userData.splice(index, 1);
  return userData;
};

const findConnectedUser = (userId) => {
  return userData.find((user) => user.userId === userId);
};

export { addUser, removeUser, findConnectedUser };
