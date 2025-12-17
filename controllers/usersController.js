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

export const getUserInfoByIdController = async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserInfo(userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
};

export const getCurrentUserController = async (req, res) => {
  const userId = req.user.id;
  const userInfo = await userService.getCurrentUserInfo(userId, req.user);
  res.status(200).json(userInfo);
};

export const getLoggedInUserRecipesController = async (req, res) => {
  const userId = req.user.id;
  const { page, limit } = req.query;

  console.log("Fetching recipes for user:", userId, "Page:", page, "Limit:", limit);
  const result = await userService.getUserRecipes(userId, page, limit);

  res.status(200).json(result);
};

export const getUserRecipesController = async (req, res) => {
  const { userId } = req.params;
  const { page, limit } = req.query;

  const user = await userService.getUserInfo(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const result = await userService.getUserRecipes(userId, page, limit);

  res.status(200).json(result);
};

export const updateCurrentUserAvatar = async (req, res) => {
  const file = req.file;
  const userId = req.user.id;
  const avatar = await userService.updateCurrentUserAvatar(file, userId);

  res.status(201).json(avatar);
}

export default {
  getFollowersController,
  getFollowingController,
  followUserController,
  unfollowUserController,
  getUserInfoByIdController,
  getCurrentUserController,
  getLoggedInUserRecipesController,
  getUserRecipesController,
};
