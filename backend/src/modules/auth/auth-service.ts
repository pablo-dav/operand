// import AuthRepository from "./auth-repository";
import * as yup from "yup";
import { AuthenticationError } from "../../helpers/error";
import { User, UserLoginPayload, UserRegisterPayload } from "./auth-interfaces";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../..";
import admin from "firebase-admin";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import { Get, Post, Route, Tags, Body, SuccessResponse, Security, Hidden, Request } from "tsoa";
// Load the service account key
const serviceAccount = JSON.parse(readFileSync("./operand-90456-firebase-adminsdk-n3mtn-80f533b613.json", "utf8"));

@Route("auth")
@Tags("Auth")
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

   @Post("login")
   async login(@Body() payload: UserLoginPayload) {
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

      const userRef = doc(db, "users", response.user.uid);
      const user = await getDoc(userRef);

      return { token, user: { ...response.user.providerData, ...user } };
   }

   @SuccessResponse("201")
   @Post("register")
   async register(@Body() payload: UserRegisterPayload) {
      const userSchema = yup.object({
         name: yup.string().min(3).required(),
         email: yup.string().email().required(),
         password: yup.string().min(6).required(),
         role: yup.string().required(),
      });
      const validatedData = await userSchema.validate(payload);

      // if (isRegistered) throw new AuthenticationError("Usuário inválido!");

      const auth = getAuth();
      // ! ALternativa via firebase
      const response = await createUserWithEmailAndPassword(auth, validatedData.email, validatedData.password);

      const token = await admin.auth().createCustomToken(response.user.uid);
      await this.saveUserData(response.user.uid, { name: validatedData.name, role: validatedData.role });

      // ! ALternativa via jwt
      // const token = this._generateAuthToken(response.user.uid)
      // return { user: response.user, token };

      return { token, user: response.user };
   }

   @Get("me")
   @Security("jwt")
   async me(@Request() user: User | any) {
      return { user };
   }
}
