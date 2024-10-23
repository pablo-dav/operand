import { Request, Response } from "express";
import { onError, onSuccess } from "../../helpers/response";
import TaskService from "./task-service";

export default class TaskController {
   private readonly service: TaskService;

   constructor() {
      this.service = new TaskService();
   }

   public async index(request: Request, response: Response) {
      try {
         const tasks = await this.service.fetchAll();

         return onSuccess(response, 200, tasks);
      } catch (error: any) {
         return onError(response, error);
      }
   }

   public async show(request: Request, response: Response) {
      try {
         const taskId = request.params.id;

         const task = await this.service.fetchById(taskId);

         return onSuccess(response, 200, task);
      } catch (error: any) {
         return onError(response, error);
      }
   }

   public async search(request: Request, response: Response) {
      try {
         const books = await this.service.search(request.body);

         return onSuccess(response, 200, books);
      } catch (error: any) {
         return onError(response, error);
      }
   }

   public async store(request: Request, response: Response) {
      try {
         const task = await this.service.store(request.body);

         return onSuccess(response, 201, task);
      } catch (error: any) {
         return onError(response, error);
      }
   }

   public async update(request: Request, response: Response) {
      try {
         const bookId = request.params.id;
         const book = await this.service.update(bookId, request.body);

         return onSuccess(response, 200, book);
      } catch (error: any) {
         return onError(response, error);
      }
   }

   public async destroy(request: Request, response: Response) {
      try {
         const bookId = request.params.id;
         const book = await this.service.destroy(bookId);

         return onSuccess(response, 200, book);
      } catch (error: any) {
         return onError(response, error);
      }
   }
}
