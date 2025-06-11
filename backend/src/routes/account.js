import {Router} from "express"
import { AccountModel } from "../model/accountSchema.js";
import { StatusCode } from "../StatusCodes/StatusCode.js";
import mongoose from "mongoose";
const AccountRouter = Router();

AccountRouter.get("/get/balance",async(req,res)=>{
    try {
        const acc = await AccountModel.findOne({
            user: req.userId
        });
        res.status(StatusCode.FOUND).json({
            balance : acc.balance
        });
    } catch (error) {
        res.status(StatusCode.NOT_FOUND).json({
            message : error.toString()
        })
    }
});

AccountRouter.post("/transfer",async (req,res)=>{

    try {
        const session = await mongoose.startSession(); 

    session.startTransaction();
    const {amount , to} = req.body;

    // Fetching the accounts with transaction: 
    const userId = req.userId;

    const account = await AccountModel.findOne({
        user: userId
    }).session(session).lean();

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(StatusCode.METHOD_NOT_ALLOWED).json({
            message: "Insuffient Balance"
        }); 
    }

    const toAccount = await AccountModel.findOne({
        user: to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        res.status(StatusCode.NOT_FOUND).json({
            message: "Invalid Account"
        });
    }
     // performing transaction: 
     await AccountModel.updateOne({
        user: userId
    },{
        $inc :{
            balance: -amount
        }
    }).session(session);

    await AccountModel.updateOne({
        user: to
    },{
        $inc: {
            balance: amount
        }
    }).session(session)

    await session.commitTransaction();
    res.status(StatusCode.ACCEPTED).json({
        message: "Transfer Successfull"
    })
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json({
            message: error.toString()
        })
    }
})

export {AccountRouter}