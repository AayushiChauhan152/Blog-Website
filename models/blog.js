import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectID,
    ref: "user",
  },
});

const blog = new mongoose.model("blog", blogSchema);

export default blog;
