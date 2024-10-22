import { NextFunction, Response } from "express";
import { AuthenticationError } from "../helpers/error";
import { onError } from "../helpers/response";
import { getAuth, signInWithCustomToken } from "firebase/auth";
// const userRepository: AuthRepository = new AuthRepository();

export async function verifyToken(request: any, response: Response, next: NextFunction) {
   try {
      const auth = getAuth();
      const token = request.headers.authorization?.replace("Bearer ", "");
      const response = await signInWithCustomToken(auth, token);

      if (!response.user) throw new AuthenticationError("Usuário inválido!");

      request.user = response.user;

      next();
   } catch (error: any) {
      return onError(response, error);
   }
}
