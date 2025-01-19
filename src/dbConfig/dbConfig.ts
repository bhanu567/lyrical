import mongoose from "mongoose";

export async function getDatabaseConnection(mongoUrl: string) {
  try {
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

export function connect(databaseName: string) {
  try {
    const mongoUrl =
      databaseName === "music"
        ? process.env.MUSIC_COURSE_DATABASE_URL!
        : process.env.USERS_DATABASE_URL!;

    getDatabaseConnection(mongoUrl);
  } catch (error) {
    console.log("Something goes wrong! in Connect");
    console.log(error);
  }
}
// import mongoose, { Connection } from "mongoose";

// const connections: Record<string, Connection> = {};

// const getDatabaseConnection = async (
//   databaseName: string,
//   mongoUrl: string
// ) => {
//   try {
//     if (!connections[databaseName]) {
//       connections[databaseName] = await mongoose.createConnection(mongoUrl, {
//         serverSelectionTimeoutMS: 30000,
//         socketTimeoutMS: 45000,
//       });

//       connections[databaseName].on("connected", () =>
//         console.log(`Connected to database: ${databaseName}`)
//       );
//       connections[databaseName].on("error", (err) =>
//         console.error(`Error connecting to database ${databaseName}:`, err)
//       );
//     }
//   } catch (error) {
//     console.log("Something goes wrong!");
//     console.log(error);
//   }
// };

// export async function connect(databaseName: string) {
//   try {
//     const mongoUrl =
//       databaseName === "music"
//         ? process.env.MUSIC_COURSE_DATABASE_URL!
//         : process.env.USERS_DATABASE_URL!;

//     await getDatabaseConnection(databaseName, mongoUrl);
//   } catch (error) {
//     console.log("Something goes wrong! in Connect");
//     console.log(error);
//   }
// }
