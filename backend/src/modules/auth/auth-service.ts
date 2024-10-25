// import AuthRepository from "./auth-repository";
import * as yup from "yup";
import { AuthenticationError } from "../../helpers/error";
import { User, UserLoginPayload, UserRegisterPayload } from "./auth-interfaces";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../..";
import admin from "firebase-admin";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";

// Load the service account key
const serviceAccount = JSON.parse(readFileSync("./operand-90456-firebase-adminsdk-n3mtn-80f533b613.json", "utf8"));

export default class AuthService {
   constructor() {
      admin.initializeApp({
         credential: admin.credential.cert(serviceAccount),
      });
   }

   private _generateAuthToken(email: string, expiresIn: string = "24h") {
      return jwt.sign({ payload: email }, process.env.jwtSecret as string, { expiresIn });
   }

   saveUserData = async (uid: string, data: { name: string; role: string }) => {
      await setDoc(doc(db, "users", uid), data);
      console.log("User data saved!");
   };

   async login(payload: UserLoginPayload) {
      const userSchema = yup.object({
         email: yup.string().email().required(),
         password: yup.string().min(6).required(),
      });
      const validatedData = await userSchema.validate(payload);

      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, validatedData.email, validatedData.password);

      // ! ALternativa via firebase
      const token = await admin.auth().createCustomToken(response.user.uid);
      // ! ALternativa via jwt
      // const token = this._generateAuthToken(response.user.uid)

      if (!response.user) throw new AuthenticationError("Usuário inválido!");

      return { token, user: response.user };
   }

   async register(payload: UserRegisterPayload) {
      const userSchema = yup.object({
         name: yup.string().min(3).required(),
         email: yup.string().email().required(),
         password: yup.string().min(8).required(),
         role: yup.string().required(),
      });
      const validatedData = await userSchema.validate(payload);

      // if (isRegistered) throw new AuthenticationError("Usuário inválido!");

      const auth = getAuth();
      // ! ALternativa via firebase
      const response = await createUserWithEmailAndPassword(auth, validatedData.email, validatedData.password);

      await this.saveUserData(response.user.uid, { name: validatedData.name, role: validatedData.role });

      // ! ALternativa via jwt
      // const token = this._generateAuthToken(response.user.uid)
      // return { user: response.user, token };

      return { user: response.user };
   }

   async me(user: User) {
      return { user };
   }
}
