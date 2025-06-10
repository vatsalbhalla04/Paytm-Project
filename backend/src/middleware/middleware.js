import { JWT_SECRET } from "../config/secret.js";              
import jwt from "jsonwebtoken";                             
import { StatusCode } from "../StatusCodes/StatusCode.js";

export default function middleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCode.METHOD_NOT_ALLOWED).json({
      message: "Incorrect Token",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const verifyUser = jwt.verify(token, JWT_SECRET); 

    if (verifyUser.id) {
      req.userId = verifyUser.id;
      next();
    } else {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: "Bad Request",
      });
    }
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.toString(),
    });
  }
}
