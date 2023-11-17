import { validateToken } from "../services/authentication.js";

export function checkForAuthentication(cookiesName) {
  return (req, res, next) => {
    const cookieVal = req.cookies[cookiesName];

    if (!cookieVal) {
      return next();
    }
    try {
      const userPayload = validateToken(cookieVal);
      req.user = userPayload;
    } catch (err) {}
    return next();
  };
}
