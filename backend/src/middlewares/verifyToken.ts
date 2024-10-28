import { NextFunction, Response } from "express";
import { AuthenticationError } from "../helpers/error";
import { onError } from "../helpers/response";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import { doc, getDoc } from "firebase/firestore";
import { db } from "..";

// const userRepository: AuthRepository = new AuthRepository();

export async function verifyToken(request: any, response: Response, next: NextFunction) {
   try {
      const auth = getAuth();
      const token = request.headers.authorization?.replace("Bearer ", "");
      const response = await signInWithCustomToken(auth, token);

      // ! ALternativa via jwt
      // const decodedToken = jwt.verify(token, `${process.env.jwtSecret}`);
      // const user = admin.auth().getUser(decodedToken as string);
      // request.user = user;

      if (!response.user) throw new AuthenticationError("Usuário inválido!");

      const userRef = doc(db, "users", response.user.uid);
      const user = await getDoc(userRef);

      request.user = { ...response.user.providerData[0], ...user.data() };

      next();
   } catch (error: any) {
      return onError(response, error);
   }
}
