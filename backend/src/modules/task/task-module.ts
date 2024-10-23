import { Module } from "../../interfaces/module-interface";
import TaskRouter from "./task-router";

export default class TaskModule implements Module {
   public readonly moduleName: string;
   public readonly router: TaskRouter;
   public isPublic: boolean = true;

   constructor(moduleName: string) {
      this.moduleName = moduleName;

      this.router = new TaskRouter();
      this.loadRoutes();
   }

   private loadRoutes() {
      this.router.index().show().search().store().update().delete();
   }
}
