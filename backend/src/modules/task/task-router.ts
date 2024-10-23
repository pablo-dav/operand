import { Request, Response, Router } from "express";
// import { verifyToken } from "../../middlewares/verifyToken";
import { AppRouter } from "../../interfaces/module-interface";
import TaskController from "./task-controller";
import { verifyAdmin } from "../../middlewares/verifyAdmin";
export default class TaskRouter implements AppRouter {
   public readonly router: Router = Router();
   private readonly controller: TaskController;

   constructor() {
      this.controller = new TaskController();
   }
   public index() {
      this.router.get("/", (request: Request, response: Response) => {
         this.controller.index(request, response);
      });
      return this;
   }

   public show() {
      this.router.get("/:id", (request: Request, response: Response) => {
         this.controller.show(request, response);
      });
      return this;
   }

   public search() {
      this.router.post("/search", (request: Request, response: Response) => {
         this.controller.search(request, response);
      });
      return this;
   }

   public store() {
      this.router.post("/", (request: Request, response: Response) => {
         this.controller.store(request, response);
      });
      return this;
   }

   public update() {
      this.router.patch("/:id", verifyAdmin, (request: Request, response: Response) => {
         this.controller.update(request, response);
      });
      return this;
   }

   public delete() {
      this.router.delete("/:id", verifyAdmin, (request: Request, response: Response) => {
         this.controller.destroy(request, response);
      });
      return this;
   }
}
