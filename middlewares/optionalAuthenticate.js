import { verifyToken } from "../helpers/jwt.js";
import { findUser } from "../services/authServices.js";

/**
 * Optional authentication middleware
 * 
 * This middleware attempts to authenticate the user if a token is provided,
 * but does not throw errors if:
 * - No Authorization header is present
 * - Token is invalid or expired
 * - User is not found or logged out
 * 
 * If authentication succeeds, req.user will be set.
 * If authentication fails or no token is provided, req.user will be undefined.
 * 
 * Use this middleware for endpoints that should work for both authenticated
 * and unauthenticated users (e.g., to show personalized data when logged in).
 */
const optionalAuthenticate = async (req, res, next) => {
  try {
    const authorization = req.get("Authorization");

    // If no authorization header, continue without authentication
    if (!authorization) {
      return next();
    }

    const [bearer, token] = authorization.split(" ");
    
    // If bearer token format is incorrect, continue without authentication
    if (bearer !== "Bearer" || !token) {
      return next();
    }

    // Verify token - if invalid, continue without authentication
    const { data, error } = verifyToken(token);
    if (error || !data) {
      return next();
    }

    // Find user - if not found, continue without authentication
    const user = await findUser({ id: data.id });
    if (!user) {
      return next();
    }

    // Check if user is logged out - if so, continue without authentication
    if (!user.token) {
      return next();
    }

    // Authentication successful - set req.user
    req.user = user;
    next();
  } catch (error) {
    // If any unexpected error occurs, continue without authentication
    // This ensures the endpoint still works for unauthenticated users
    next();
  }
};

export default optionalAuthenticate;

