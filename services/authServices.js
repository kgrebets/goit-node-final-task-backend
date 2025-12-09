import bcrypt from "bcrypt";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";
import { createToken, verifyToken } from "../helpers/jwt.js";
import sendEmail from "../helpers/sendEmail.js";

const { PUBLIC_URL } = process.env;

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);
  const user = await User.create({ ...payload, password: hashPassword });

  const verificationToken = createToken({ email: payload.email });

  const verifyEmail = {
    to: payload.email,
    subject: "Verify email",
    html: `<a href="${PUBLIC_URL}/api/auth/verify/${verificationToken}" target="_blank">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  return user;
};

export const verifyUser = async (verificationToken) => {
  const { data, error } = verifyToken(verificationToken);
  if (error) throw HttpError(401, error.message);

  const user = await findUser({ email: data.email });
  if (user.verify) throw HttpError(401, "Email already verified");

  await user.update({ verify: true });
};

export const resendVerifyUser = async ({ email }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email not found");
  if (user.verify) throw HttpError(401, "Email already verified");

  const verificationToken = createToken({ email });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${PUBLIC_URL}/api/auth/verify/${verificationToken}" target="_blank">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email or password invalid");

  if (!user.verify) throw HttpError(401, "Email not verified");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password invalid");

  const payload = {
    id: user.id,
  };

  const token = createToken(payload);

  await user.update({ token });

  return {
    token,
    user: {
      username: user.username,
      email: user.email,
    },
  };
};

export const refreshUser = async (user) => {
  const token = createToken({ id: user.id });

  await user.update({ token });

  return {
    token,
    user: {
      username: user.username,
      email: user.email,
    },
  };
};

export const logoutUser = async (user) => {
  await user.update({ token: null });

  return true;
};
