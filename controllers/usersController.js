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

export const getUserByIdController = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUserDetailed(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getFollowersController,
  getFollowingController,
  followUserController,
  unfollowUserController,
  getUserByIdController,
};
