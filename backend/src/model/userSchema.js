import mongoose from "mongoose";
const {Schema} = mongoose

const UserSchema = new Schema({
    first_name : {
        type: String, 
        required : true
    },
    last_name : {
        type: String, 
        required : true
    },
    username : {
        type: String, 
        required : true,
        unique : true,
    },
    email: {
        type: String, 
        unique: true,
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    createdAt :{
        type : Date, 
        default : Date.now
    }
});

export const UserModel = mongoose.model("User",UserSchema);