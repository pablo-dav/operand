import { Module } from "../../interfaces/module-interface";
import AuthRouter from "./auth-router";

export default class AuthModule implements Module {
   public readonly moduleName: string;
   public readonly router: AuthRouter;
   public isPublic: boolean = true;

   constructor(moduleName: string) {
      this.moduleName = moduleName;

      this.router = new AuthRouter();
      this.loadRoutes();
   }

   private loadRoutes() {
      this.router.login().register().me();
   }
}
