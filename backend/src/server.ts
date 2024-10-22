import express, { Application, Router } from "express";
import cors from "cors";
import morgan from "morgan";
import AuthModule from "./modules/auth/auth-module";
// import router from './routes';

export class SetupApplication {
   private app: Application;
   private router: Router;
   private context?: string;
   private version?: string;

   constructor() {
      this.app = express();
      this.context = process.env.apiContext || "api";
      this.version = process.env.apiVersion || "v1";
      this.router = Router();
   }

   public init(): void {
      this.bootstrap();
      this.setupRoutes();
   }

   private setupRoutes(): void {
      this.router.use(`/${this.context}/${this.version}`, new AuthModule("auth").router.router);
      this.app.use(this.router);
   }

   private bootstrap(): void {
      this.app.disable("x-powered-by");
      this.app.use(morgan("dev"));
      this.app.use(
         cors({
            allowedHeaders: [
               "Origin",
               "X-Requested-With",
               "Content-Type",
               "queue-token",
               "Accept",
               "X-Access-Token",
               "Authorization",
            ],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "*",
            preflightContinue: false,
         })
      );
      this.app.use(express.json({ limit: "5mb" }));
      this.app.use(express.urlencoded({ extended: true }));
   }

   public start(): void {
      this.app
         .listen(process.env.port as string, () => {
            console.log(`Server running on port ${process.env.port as string}`);
         })
         .on("error", (error) => console.error(`Error: ${error}`));
   }
}
