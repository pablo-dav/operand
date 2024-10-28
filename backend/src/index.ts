import { firebaseConfig } from "./firebase";
import { SetupApplication } from "./server";
import { initializeApp } from "firebase/app";
import dotenv from "dotenv";
dotenv.config();
import { getFirestore } from "firebase/firestore";

class Server {
   static start(): void {
      const application = new SetupApplication();
      application.init();
      application.start();
   }
}

const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

Server.start();

export const db = getFirestore(app);
