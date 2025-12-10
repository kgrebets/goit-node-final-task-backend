import userService from "../services/userService.js";

export const getFollowersController = async (req, res) => {
  const { userId } = req.params;
  const followers = await userService.getFollowers(userId);
  res.status(200).json(followers);
};

export const getFollowingController = async (req, res) => {
  const userId = req.user.id;
  const following = await userService.getFollowing(userId);
  res.status(200).json(following);
};

export const followUserController = async (req, res) => {
  const followerId = req.user.id;
  const { userId } = req.params;

  await userService.followUser(followerId, userId);

  res.status(201).json({
    message: "Successfully followed user",
  });
};

export const unfollowUserController = async (req, res) => {
  const followerId = req.user.id;
  const { userId } = req.params;

  await userService.unfollowUser(followerId, userId);

  res.status(200).json({
    message: "Successfully unfollowed user",
  });
};

export default {
  getFollowersController,
  getFollowingController,
  followUserController,
  unfollowUserController,
};
