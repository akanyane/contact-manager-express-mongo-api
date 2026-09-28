import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please add the username"],
  },
  email: {
    type: String,
    required: [true, "Please add the user email address"],
    unique: [true, "Email address already taken"],
  },
  password: {
    type: String,
    required: [true, "Please add the user password"],
  }
}, {
  timestamps: true,
});

export default model<IUser>("User", userSchema);
