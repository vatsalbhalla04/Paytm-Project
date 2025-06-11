import { Router } from "express";
import { UserModel } from "../model/userSchema.js";
import { signUpSchema } from "../zod/signUpSchema.js";
import bcrypt from "bcrypt";
import middleware from "../middleware/middleware.js";
import { StatusCode } from "../StatusCodes/StatusCode.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/secret.js";
import { AccountModel } from "../model/accountSchema.js";
const UserRoute = Router();

UserRoute.post("/signup", async (req, res) => {
  const success = signUpSchema.safeParse(req.body);

  if (!success) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "Validation failed",
    });
  }

  const { first_name, last_name, username, email, password} = req.body;

  try {
    const hashPass = await bcrypt.hash(password, 4);

    const user = await UserModel.create({
      first_name,
      last_name,
      username,
      email,
      password: hashPass,
    });

    res.status(StatusCode.CREATED).json({
      message: `Your Account Has been Created ${first_name}! `,

    });
  } catch (error) {
    if (error.code === 11000) {
      //error.code === 11000 → MongoDB duplicate key error
      const duplicatedField = Object.keys(error.keyPattern)[0];

      res.status(StatusCode.CONFLICT).json({
        message: `This ${duplicatedField} is already in use`,
      });
    } else {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message:
          "Something went wrong while creating the account. Please try again later.",
      });
    }
  }
});

UserRoute.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await UserModel.findOne({
      username,
    });
    if (!response) {
      return res.status(StatusCode.NOT_FOUND).json({
        message: "User Does Not Exist",
      });
    }
    const passMatch = await bcrypt.compare(password, response.password);
    if (passMatch) {
      const token = jwt.sign(
        {
          id: response._id.toString(),
        },
        JWT_SECRET
      );
      return res.status(StatusCode.FOUND).json({
        token,
      });
    } else {
      res.status(StatusCode.UNAUTHORIZED).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.toString(),
    });
  }
});

UserRoute.post("/addMoney", middleware, async (req, res) => {
  const { paisaDalo } = req.body;

  try {
    const userId = req.userId;

    const foundUser = await UserModel.findOne({ _id: userId });

    if (!foundUser) {
      return res.status(StatusCode.NOT_FOUND).json({
        message: "User does not exist",
      });
    }

    const addMoney = Number.isFinite(paisaDalo) ? paisaDalo : 1 + Math.random() * 10000;

    const account = await AccountModel.create({
      user: userId,
      balance: addMoney,
    });

    return res.status(StatusCode.CREATED).json({
      message: "Money added successfully",
      account,
    });

  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.toString(),
    });
  }
});

UserRoute.put("/changePassword", middleware, async (req, res) => {
  const { email, currPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({
      email,
    });
    if (!user) {
      return res.status(StatusCode.NOT_FOUND).json({
        message: "User Not Found",
      });
    }

    const ispassMatch = await bcrypt.compare(currPassword, user.password);
    if (!ispassMatch) {
      return res.status(StatusCode.CONFLICT).json({
        message: "Current Password is incorrect",
      });
    }
    const hashedPass = await bcrypt.hash(newPassword, 4);

    await UserModel.updateOne({
      email,
      password: hashedPass,
    });
    res.status(StatusCode.ACCEPTED).json({
      message: "Your Password Has Been Updated Succesfully",
    });
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.toString(),
    });
  }
});

UserRoute.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await UserModel.find({
      $or: [{
        first_name: {
            $regex: filter,
          }
        },
        {
          last_name: {
            $regex: filter,
          }
        }]
    });
    res.status(StatusCode.FOUND).json({
      user : users.map(user=>({
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name, 
          _id : user._id
      }))
    });
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message : error.toString()
    })
  }


});

export { UserRoute };
