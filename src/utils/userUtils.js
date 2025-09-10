export const createUserMap = (users) => {
  if (!users?.length) {
    return {};
  }

  return users.reduce((map, user) => {
    const userId =
      typeof user.id === "number" ? user.id : parseInt(user.id, 10);
    const userData = { name: user.name, image: user.image };
    map[userId] = userData;
    return map;
  }, {});
};

export const getUserDetails = (userId, userMap) => {
  const numericUserId = Number(userId);
  return userMap[numericUserId] || { name: "Unknown User", image: null };
};
