import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    length: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const RATING = mongoose.model("RATING", ratingSchema);

export default RATING;