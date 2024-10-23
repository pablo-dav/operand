import { NextFunction, Response } from "express";
import { AuthenticationError } from "../helpers/error";
import { onError } from "../helpers/response";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import { readFileSync } from "fs";
const serviceAccount = JSON.parse(readFileSync("./operand-90456-firebase-adminsdk-n3mtn-80f533b613.json", "utf8"));

// const userRepository: AuthRepository = new AuthRepository();

export async function verifyToken(request: any, response: Response, next: NextFunction) {
   try {
      // admin.initializeApp({
      //    credential: admin.credential.cert(serviceAccount),
      // });

      const auth = getAuth();
      const token = request.headers.authorization?.replace("Bearer ", "");
      const response = await signInWithCustomToken(auth, token);

      // ! ALternativa via jwt
      // const decodedToken = jwt.verify(token, `${process.env.jwtSecret}`);
      // const user = admin.auth().getUser(decodedToken as string);
      // request.user = user;

      if (!response.user) throw new AuthenticationError("Usuário inválido!");

      request.user = response.user;

      next();
   } catch (error: any) {
      return onError(response, error);
   }
}
