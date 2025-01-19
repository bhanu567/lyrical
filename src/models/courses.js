import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "please provide a course name"],
  },
  slug: {
    type: String,
    required: [true, "please provide a url slug"],
  },
  description: {
    type: String,
    require: [true, "please provide item description"],
  },
  price: {
    type: Number,
    require: [true, "please provide price for the item"],
  },
  instructor: {
    type: String,
    required: [true, "please provide course instructor name"],
  },
  isFeatured: {
    type: Boolean,
    require: [true, "field should not be blanked"],
  },
  image: {
    type: String,
    require: [true, "please provide course image url"],
  },
});

export default mongoose.model("Music_course", courseSchema);
