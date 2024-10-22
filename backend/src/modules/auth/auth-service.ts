// import AuthRepository from "./auth-repository";
import * as yup from "yup";
import { sendEmail } from "../../providers/nodemailer";
import { AuthenticationError, BadRequestError, NotFoundError, UnprocessableEntityError } from "../../helpers/error";
import {
   UserLoginPayload,
   UserRegisterPayload,
   UserForgotPasswordPayloadDTO,
   UserResetPasswordPayloadDTO,
} from "./auth-interfaces";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../..";
import admin from "firebase-admin";
import { readFileSync } from "fs"; // Import `fs` to read the service account key file

// Load the service account key
const serviceAccount = JSON.parse(readFileSync("./operand-90456-firebase-adminsdk-n3mtn-80f533b613.json", "utf8"));

export default class AuthService {
   //  private readonly authRepository: AuthRepository;

   constructor() {
      admin.initializeApp({
         credential: admin.credential.cert(serviceAccount),
      });
      // this.authRepository = new AuthRepository();
   }

   saveUserData = async (uid: string, data: { name: string; role: string }) => {
      await setDoc(doc(db, "users", uid), data);
      console.log("User data saved!");
   };

   async login(payload: UserLoginPayload) {
      const userSchema = yup.object({
         email: yup.string().email().required(),
         password: yup.string().min(8).required(),
      });
      const validatedData = await userSchema.validate(payload);

      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, validatedData.email, validatedData.password);

      const token = await admin.auth().createCustomToken(response.user.uid);

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

      const response = await createUserWithEmailAndPassword(auth, validatedData.email, validatedData.password);

      await this.saveUserData(response.user.uid, { name: validatedData.name, role: validatedData.role });

      return { user: response.user };
   }

   // async forgotPassword(email: string) {
   //    const userSchema = yup.object({
   //       email: yup.string().email().required(),
   //    });
   //    const validatedData = await userSchema.validate(email);

   //    const user = await this.authRepository.findByEmail(validatedData.email);

   //    if (!user) throw new AuthenticationError("Usuário inválido!");

   //    const template = fs.readFileSync(path.resolve(__dirname, "../../templates/forgot-password.html"));

   //    const token = this._generateAuthToken(user.email, "1h");

   //    const success = this.authRepository.saveConfirmationCode(user.id, token);

   //    if (!success) throw new UnprocessableEntityError("Erro ao processar solicitação");

   //    let emailBody = template
   //       .toString()
   //       .replace("{{FRONT_URL}}", process.env.frontURL as string)
   //       .replace("{{TOKEN}}", `${token}`)
   //       .replace("{{NAME}}", `${user.name}`)
   //       .replace("{{EMAIL}}", `${validatedData.email}`);

   //    const message = await sendEmail(user.email, "Esqueci Minha Senha", emailBody);

   //    return message;
   // }

   async me(user: {}) {
      return { user };
   }

   // async updatePassword(payload: UserForgotPasswordPayloadDTO) {
   //    const userSchema = yup.object({
   //       newPassword: yup.string().min(8).required(),
   //       newPasswordConfirmation: yup.string().min(8).required(),
   //       confirmationCode: yup.string().required(),
   //    });

   //    const validatedData = await userSchema.validate(payload);

   //    if (validatedData.newPassword !== validatedData.newPasswordConfirmation)
   //       throw new BadRequestError("Senha inválida!");

   //    const decodedToken = jwt.verify(validatedData.confirmationCode, process.env.jwtSecret as string);
   //    const user = await this.authRepository.findByConfirmationCode(validatedData.confirmationCode);

   //    if (!decodedToken || !user) throw new BadRequestError("Código inválido!");

   //    await this.authRepository.saveConfirmationCode(user.id, null);

   //    const salt = await bcrypt.genSalt();
   //    const hashPassword = await bcrypt.hash(validatedData.newPassword, salt);

   //    const isPassSaved = await this.authRepository.updatePassword(user.id, hashPassword);

   //    if (!isPassSaved) throw new UnprocessableEntityError("Senha Inválida!");

   //    return `Senha atualizada com sucesso!`;
   // }

   // async resetPassword(payload: UserResetPasswordPayloadDTO) {
   //    const userSchema = yup.object({
   //       newPassword: yup.string().min(8).required(),
   //       email: yup.string().required(),
   //    });

   //    const validatedData = await userSchema.validate(payload);

   //    const user = await this.authRepository.findByEmail(validatedData.email);

   //    if (!user) throw new BadRequestError("Usuário inválido!");

   //    const salt = await bcrypt.genSalt();
   //    const hashPassword = await bcrypt.hash(validatedData.newPassword, salt);

   //    const isPassSaved = await this.authRepository.updatePassword(user.id, hashPassword);

   //    if (!isPassSaved) throw new UnprocessableEntityError("Senha Inválida!");

   //    return `Senha atualizada com sucesso!`;
   // }
}
