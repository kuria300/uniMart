import mongoose, { model, models, Schema } from "mongoose";

const UserSchema= new Schema({
    email:{type: String, required: true, unique: true},
    password:{ type:String},
    name: { type: String },
    image: { type: String },
    provider: { type: String, default: "credentials" }, // e.g. "google" or "credentials"
  },
  { timestamps: true } 
)

export const User= models.User || mongoose.model('User', UserSchema)