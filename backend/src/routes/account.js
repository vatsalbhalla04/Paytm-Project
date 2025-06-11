import {Router} from "express"
import { AccountModel } from "../model/accountSchema.js";
import { StatusCode } from "../StatusCodes/StatusCode.js";
const AccountRouter = Router();

AccountRouter.get("/get/balance",async(req,res)=>{
    const acc = await AccountModel.findOne({
        userId: req.userId
    });
    res.status(StatusCode.FOUND).json({
        balance : acc.balance
    });
});

AccountRouter.post("/transfer",async (req,res)=>{
    
})

export {AccountRouter}