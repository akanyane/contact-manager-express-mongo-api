import { Schema, Types, model } from "mongoose";

export interface IContact {
  user_id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
}

const contactSchema = new Schema<IContact>({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please add the contact name"],
  },
  email: {
    type: String,
    required: [true, "Please add the email address"],
  },
  phone: {
    type: String,
    required: [true, "Please add the phone number"],
  }
}, {
  timestamps: true,
});

export default model<IContact>("Contact", contactSchema);
