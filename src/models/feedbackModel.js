import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "please provide an email to register your concern"],
    unique: true,
  },
  message: {
    type: String,
    require: [true, "field should not be blanked"],
  },
});

export default mongoose.model("Feedback", feedbackSchema);
