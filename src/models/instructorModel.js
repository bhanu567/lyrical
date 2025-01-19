import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  name: { type: String, require: [true, "please provide a name"] },
  designation: {
    type: String,
    require: [true, "please provide a designation"],
  },
  image: { type: String, require: [true, "please provide an image link"] },
});

export default mongoose.model("instructors", instructorSchema);
