import { NextFunction, Response } from "express";
import { ForbiddenError } from "../helpers/error";
import { onError } from "../helpers/response";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "..";

export async function verifyAdmin(request: any, response: Response, next: NextFunction) {
   try {
      const auth = getAuth();
      const token = request.headers.authorization?.replace("Bearer ", "");
      const response = await signInWithCustomToken(auth, token);

      const userRef = doc(db, "tasks", response.user.uid);
      const user = await getDoc(userRef);

      const userData = user.data();

      if (userData && userData.role != "admin") throw new ForbiddenError("Usuário sem permissão!");

      next();
   } catch (error: any) {
      return onError(response, error);
   }
}
