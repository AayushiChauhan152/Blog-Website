import mongoose from "mongoose";
import { createToken } from "../services/authentication.js";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
);

schema.static(
  "matchPasswordandGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }
    const pswd = user.password;
    if (pswd !== password) {
      throw new Error("incorrect pswd");
    }
    const token = createToken(user);
    return token;
  }
);

const user = new mongoose.model("User", schema);
export default user;
