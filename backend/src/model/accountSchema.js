import mongoose from "mongoose";
const {Schema , Types} = mongoose

const AccountSchema = new Schema({
    balance : {
        type: Number, 
        required: true
    }, 
    createdAt :{
        type : Date, 
        default : Date.now
    },
    user:{
        type: Types.ObjectId,
        ref : "User",
        required: true
    }
})

export const AccountModel = mongoose.model("Account",AccountSchema)