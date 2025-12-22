import { Sequelize } from "sequelize";
import User from "../db/models/User.js";
import Recipe from "../db/models/Recipe.js";
import UserFollow from "../db/models/UserFollow.js";
import HttpError from "../helpers/HttpError.js";
import s3Client from "../uploader/s3-client.js";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { USER_AVATARS_S3_BUCKET_FOLDER } from "../helpers/constants.js";
import randomImageName from "../helpers/generateRandomImageName.js";
import sharp from "sharp";
import getSignedAvatarUrl from "../helpers/getSignedAvatarUrl.js";
import UserFavorite from "../db/models/UserFavorites.js";

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
    attributes: [
      "id",
      "email",
      "username",
      "avatar",
      [Sequelize.fn("COUNT", Sequelize.col("Recipes.id")), "totalRecipes"],
    ],
    include: [
      {
        model: Recipe,
        as: "Recipes",
        attributes: [],
        required: false,
      },
    ],
    through: {
      as: "user_follow",
      attributes: ["id", "followerId", "followingId", "createdAt", "updatedAt"],
    },
    group: ["user.id", "user_follow.id"],
    order: [[Sequelize.col("user.id"), "ASC"]],
    subQuery: false,
  });

  return followers.map((u) => {
    const obj = u.toJSON();
    obj.totalRecipes = Number(obj.totalRecipes || 0);
    return obj;
  });
};

const getFollowing = async (userId) => {
  const user = await getUserById(userId);

  const following = await user.getFollowing({
    attributes: [
      "id",
      "email",
      "username",
      "avatar",
      [
        User.sequelize.fn("COUNT", User.sequelize.col("Recipes.id")),
        "totalRecipes",
      ],
    ],
    include: [
      {
        model: Recipe,
        as: "Recipes",
        attributes: [],
        required: false,
      },
    ],
    through: {
      as: "user_follow",
      attributes: ["id", "followerId", "followingId", "createdAt", "updatedAt"],
    },
    group: ["user.id", "user_follow.id"],
    order: [["id", "ASC"]],
  });

  return following.map((u) => {
    const json = u.toJSON();
    return { ...json, totalRecipes: Number(json.totalRecipes || 0) };
  });
};

const followUser = async (followerId, followingId) => {
  if (followerId === followingId) {
    throw HttpError(400, "You cannot follow yourself");
  }

  try {
    const follow = await UserFollow.create({
      followerId: followerId,
      followingId: followingId,
    });

    console.log("Follow created in DB with ID:", follow.id);
    return true;
  } catch (error) {
    console.error("Error creating follow:", error.message);
    if (error.name === "SequelizeUniqueConstraintError") {
      return true;
    }

    throw HttpError(500, "Failed to follow user");
  }
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

const getUserInfo = async (userId, currentUserId = null) => {
  const user = await User.findByPk(userId, {
    attributes: ["id", "username", "email", "avatar"],
  });
  if (!user) return null;

  const recipesCount = await Recipe.count({ where: { userid: userId } });
  const followersCount = await UserFollow.count({
    where: { followingId: userId },
  });

  const followingCount = await UserFollow.count({
    where: { followerId: userId },
  });

  const favoritesCount = await UserFavorite.count({
    where: { userid: userId },
  });

  let isFollowing = false;
  if (currentUserId) {
    const follow = await UserFollow.findOne({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });
    isFollowing = !!follow;
  }

  return {
    id: user.id,
    avatar: await getSignedAvatarUrl(user),
    name: user.username,
    email: user.email,
    recipesCount,
    followersCount,
    followingCount,
    favoritesCount,
    isFollowing,
  };
};

const getCurrentUserInfo = async (userId, user) => {
  const recipesCount = await Recipe.count({
    where: { userid: userId },
  });

  const favoritesCount = await UserFavorite.count({
    where: { userid: userId },
  });

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
    avatar: await getSignedAvatarUrl(user),
    recipesCount,
    favoritesCount,
    followersCount,
    followingCount,
  };
};

const getUserRecipes = async (userId, page, limit) => {
  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 12;
  const offset = (pageNumber - 1) * pageSize;

  const { rows, count } = await Recipe.findAndCountAll({
    where: { userid: userId },
    order: [["id", "DESC"]],
    limit: pageSize,
    offset,
    attributes: [
      "id",
      "title",
      "categoryid",
      "areaid",
      "thumb",
      "description",
      "instructions",
      "time",
    ],
  });

  return {
    total: count,
    page: pageNumber,
    totalPages: Math.ceil(count / pageSize),
    results: rows,
  };
};

const updateCurrentUserAvatar = async (avatar, userId) => {
  const user = await getUserById(userId);
  const currentAvatar = user.avatar;
  const imageName = `${USER_AVATARS_S3_BUCKET_FOLDER}/${userId}/${randomImageName()}`;
  const imageBuffer = await sharp(avatar.buffer)
    .resize({ width: 120, height: 120, fit: "cover" })
    .toFormat("webp", { quality: 80 })
    .toBuffer();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
    Body: imageBuffer,
    ContentType: avatar.mimetype,
  };

  const putAvatarCommand = new PutObjectCommand(params);

  await s3Client.send(putAvatarCommand);
  const userInfo = await user.update({ avatar: imageName });

  if (currentAvatar) {
    const deleteAvatarCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: currentAvatar,
    });
    try {
      await s3Client.send(deleteAvatarCommand);
    } catch (error) {
      // No-op: Ignore error
    }
  }

  return {
    avatar: await getSignedAvatarUrl(userInfo),
  };
};

export default {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  getUserInfo,
  getCurrentUserInfo,
  getUserRecipes,
  updateCurrentUserAvatar,
};
