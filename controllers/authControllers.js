import {
  registerUser,
  verifyUser,
  resendVerifyUser,
  loginUser,
  refreshUser,
  logoutUser,
} from "../services/authServices.js";

export const registerController = async (req, res) => {
  const newUser = await registerUser(req.body);

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

export const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  await verifyUser(verificationToken);

  res.json({
    message: "Successfully verify email",
  });
};

export const resendVerifyController = async (req, res) => {
  await resendVerifyUser(req.body);

  res.json({
    message: "Verify email resend successfully",
  });
};

export const loginController = async (req, res) => {
  const result = await loginUser(req.body);

  res.json(result);
};

export const getCurrentController = async (req, res) => {
  const result = await refreshUser(req.user);

  res.json(result);
};

export const logoutController = async (req, res) => {
  await logoutUser(req.user);

  res.status(204).send();
};
