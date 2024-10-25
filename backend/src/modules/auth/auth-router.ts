import { Request, Response, Router } from "express";
// import { verifyToken } from "../../middlewares/verifyToken";
import { AppRouter } from "../../interfaces/module-interface";
import AuthController from "./auth-controller";
import { verifyToken } from "../../middlewares/verifyToken";
export default class AuthRouter implements AppRouter {
   public readonly router: Router = Router();
   private readonly controller: AuthController;

   constructor() {
      this.controller = new AuthController();
   }
   public login() {
      this.router.post("/login", (request: Request, response: Response) => {
         this.controller.login(request, response);
      });
      return this;
   }

   public register() {
      this.router.post("/register", (request: Request, response: Response) => {
         this.controller.register(request, response);
      });
      return this;
   }

   public me() {
      this.router.get("/me", verifyToken, (request: Request, response: Response) => {
         this.controller.me(request, response);
      });
      return this;
   }
}
