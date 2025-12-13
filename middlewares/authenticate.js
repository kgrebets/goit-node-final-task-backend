import HttpError from "../helpers/HttpError.js";

import { verifyToken } from "../helpers/jwt.js";

import { findUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
  const authorization = req.get("Authorization");
  if (!authorization) throw HttpError(401, "Authoriaztion header missing");

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer")
    throw HttpError(401, "Authoriaztion header must have Bearer type");

  const { data, error } = verifyToken(token);
  if (error) throw HttpError(401, error.message);

  const user = await findUser({ id: data.id });
  req.user = user;
  next();
  if (!user) throw HttpError(401, "User not found");

  if (!user.token) throw HttpError(401, "User already logout");

  req.user = user;
  next();
};

export default authenticate;
