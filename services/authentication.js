import jwt from "jsonwebtoken";
const secret = "secret8080";

export function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, secret);
  return token;
}

export function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}
