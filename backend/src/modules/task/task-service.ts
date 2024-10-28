import { NotFoundError } from "../../helpers/error";
import { SearchPayload } from "../../interfaces/global-interface";
import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDoc,
   getDocs,
   setDoc,
   updateDoc,
   where,
   query,
   orderBy,
   limit,
   startAt,
} from "firebase/firestore";
import { TaskSavePayload, TaskUpdatePayload } from "./task-interfaces";
import { db } from "../..";
import moment from "moment";
import {
   Get,
   Post,
   Patch,
   Delete,
   Route,
   Tags,
   Queries,
   Query,
   Body,
   SuccessResponse,
   Security,
   FormField,
   UploadedFiles,
} from "tsoa";

@Route("task")
@Security("jwt")
@Tags("Task")
export default class TaskService {
   constructor() {}

   @Get("")
   async fetchAll() {
      const tasksRef = collection(db, "tasks");
      const tasksDocs = await getDocs(tasksRef);

      if (tasksDocs && tasksDocs.size == 0) throw new NotFoundError("Nenhuma task foi encontrada!");

      let tasks: Array<{}> = [];
      tasksDocs.forEach((task) => {
         tasks.push({ uid: task.id, ...task.data() });
      });

      return { tasks };
   }

   @Get("{taskId}")
   async fetchById(taskId: string) {
      const taskRef = doc(db, "tasks", taskId);
      const task = await getDoc(taskRef);
      if (!task) throw new NotFoundError("Tarefa não foi encontrada!");
      return { task: { uid: taskId, ...task.data() } };
   }

   @Post("search")
   async search(@Body() payload: SearchPayload) {
      const taskRef = collection(db, "tasks");

      // const page = payload.pagination?.page ? payload.pagination.page - 1 : 0;
      // const pageLimit = payload.pagination?.limit ? payload.pagination.limit : 10;

      const tasksStatusQuery = query(
         taskRef,
         where("status", "==", payload.search)
         // orderBy(payload.order?.by || "priority", payload.order?.direction || "asc"),
         // startAt(page * pageLimit),
         // limit(pageLimit)
      );

      const tasksDueDateQuery = query(taskRef, where("dueDate", "==", moment(payload.search).format("YYYY-DD-MM")));

      const tasksDocs = await Promise.all([getDocs(tasksStatusQuery), getDocs(tasksDueDateQuery)]);

      if (tasksDocs && tasksDocs[0].size + tasksDocs[1].size == 0)
         throw new NotFoundError("Nenhuma tarefa foi encontrada!");

      let tasks: Array<{}> = [];
      tasksDocs[0].forEach((task) => {
         tasks.push({ uid: task.id, ...task.data() });
      });
      tasksDocs[1].forEach((task) => {
         tasks.push({ uid: task.id, ...task.data() });
      });

      return { tasks };
   }

   @Post("")
   async store(@Body() payload: TaskSavePayload) {
      const tasksRef = collection(db, "tasks");
      const createdAt = moment.now();
      const updatedAt = moment.now();
      await addDoc(tasksRef, { ...payload, createdAt, updatedAt });

      return { message: "Task criada com sucesso" };
   }

   @Patch("{taskId}")
   async update(taskId: string, @Body() payload: TaskUpdatePayload) {
      const taskRef = doc(db, "tasks", taskId);
      const updatedAt = moment.now();

      await updateDoc(taskRef, { ...payload, updatedAt });

      return { message: "Task atualizada com sucesso" };
   }

   @Delete("{taskId}")
   async destroy(taskId: string) {
      const taskRef = doc(db, "tasks", taskId);

      await deleteDoc(taskRef);
      return { message: "Task deletada com sucesso" };
   }
}
