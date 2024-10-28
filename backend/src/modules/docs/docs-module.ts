import { Module } from "../../interfaces/module-interface";
import DocsRouter from "./docs-router";

export default class DocsModule implements Module {
   public readonly moduleName: string;
   public readonly router: DocsRouter;
   public isPublic: boolean = false;

   constructor(moduleName: string) {
      this.moduleName = moduleName;

      this.router = new DocsRouter();
      this.loadRoutes();
   }

   private loadRoutes() {
      this.router.index();
   }
}
