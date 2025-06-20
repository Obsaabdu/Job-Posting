import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {type: String, required: true, match: /^[A-Za-z]+$/},
    email: {type: String, required: true, unique:true}, 
    password: {type: String, required: true},
    role: {type: String, enum: ["company", "applicant"]}
})

export const User = model("User", UserSchema);

