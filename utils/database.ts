import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "promptopia",
    })

    isConnected = true;

    console.log("MongoDB connected.")
  } catch (error) {
    console.error(error);
  }
}