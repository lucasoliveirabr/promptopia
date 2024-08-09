import { Schema, model, models, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  username: string;
  image?: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (value: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Email is required and must be valid."
    }
  },
  username: {
    type: String,
    required: true,
    match: [/^(?=.{3,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 3-30 alphanumeric letters and be unique."]
  },
  image: {
    type: String
  }
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;