import mongoose from "mongoose";

export async function connect(databaseName: string) {
  try {
    let mongoUrl = "";
    if (databaseName === "music")
      mongoUrl = process.env.MUSIC_COURSE_DATABASE_URL!;
    else mongoUrl = process.env.USERS_DATABASE_URL!;
    await mongoose.connect(mongoUrl);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
