import User from "../db/models/User.js";
import Recipe from "../db/models/Recipe.js";
import UserFollow from "../db/models/UserFollow.js";
import HttpError from "../helpers/HttpError.js";

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw HttpError(404, "User not found");
  }
  return user;
};

const getFollowers = async (userId) => {
  const user = await getUserById(userId);
  const followers = await user.getFollowers({
    attributes: ["id", "email", "username", "avatar"],
    order: [["id", "ASC"]],
  });
  return followers;
};

const getFollowing = async (userId) => {
  const user = await getUserById(userId);
  const following = await user.getFollowing({
    attributes: ["id", "email", "username", "avatar"],
    order: [["id", "ASC"]],
  });
  return following;
};

const followUser = async (followerId, followingId) => {
  if (followerId === followingId) {
    throw HttpError(400, "You cannot follow yourself");
  }

  const follower = await getUserById(followerId);
  const targetUser = await getUserById(followingId);

  await follower.addFollowing(targetUser);

  return true;
};

const unfollowUser = async (followerId, followingId) => {
  if (followerId === followingId) {
    throw HttpError(400, "You cannot unfollow yourself");
  }

  const follower = await getUserById(followerId);
  const targetUser = await getUserById(followingId);

  await follower.removeFollowing(targetUser);

  return true;
};

const getCurrentUserInfo = async (userId, user) => {
  const recipesCount = await Recipe.count({
    where: { userid: userId },
  });

  // TODO: Implement favorites functionality
  // const favoritesCount = await Favorite.count({
  //   where: { userId },
  // });
  // Stub: returns -1 to indicate not implemented
  const favoritesCount = -1;

  const followersCount = await UserFollow.count({
    where: { followingId: userId },
  });

  const followingCount = await UserFollow.count({
    where: { followerId: userId },
  });

  return {
    id: user.id,
    name: user.username,
    email: user.email,
    avatar: user.avatar,
    recipesCount,
    favoritesCount,
    followersCount,
    followingCount,
  };
};

export default {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  getCurrentUserInfo,
};
