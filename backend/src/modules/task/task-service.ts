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

// Load the service account key

export default class TaskService {
   constructor() {}

   async fetchAll() {
      const tasksRef = collection(db, "tasks");
      const tasksDocs = await getDocs(tasksRef);

      if (tasksDocs && tasksDocs.size == 0) throw new NotFoundError("Nenhuma task foi encontrada!");

      let tasks: Array<Object> = [];
      tasksDocs.forEach((task) => {
         tasks.push({ uid: task.id, ...task.data() });
      });

      return { tasks };
   }

   async fetchById(taskId: string) {
      const taskRef = doc(db, "tasks", taskId);
      const task = await getDoc(taskRef);
      if (!task) throw new NotFoundError("Tarefa não foi encontrada!");
      return { task: { uid: taskId, ...task.data() } };
   }

   async search(payload: SearchPayload) {
      const taskRef = collection(db, "tasks");

      const page = payload.pagination?.page ? payload.pagination.page - 1 : 0;
      const pageLimit = payload.pagination?.limit ? payload.pagination.limit : 10;

      const tasksQuery = query(
         taskRef,
         where(payload.search.by, "==", payload.search.value),
         orderBy(payload.order?.by || "priority", payload.order?.direction || "asc"),
         startAt(page * pageLimit),
         limit(pageLimit)
      );

      const tasksDocs = await getDocs(tasksQuery);

      if (tasksDocs && tasksDocs.size == 0) throw new NotFoundError("Nenhuma tarefa foi encontrada!");

      let tasks: Array<Object> = [];
      tasksDocs.forEach((task) => {
         tasks.push({ uid: task.id, ...task.data() });
      });

      return { tasks };
   }

   async store(payload: TaskSavePayload) {
      const tasksRef = collection(db, "tasks");
      const createdAt = moment.now();
      const updatedAt = moment.now();
      await addDoc(tasksRef, { ...payload, createdAt, updatedAt });

      return { message: "Task criada com sucesso" };
   }

   async update(taskId: string, payload: TaskUpdatePayload) {
      const taskRef = doc(db, "tasks", taskId);
      const updatedAt = moment.now();

      await updateDoc(taskRef, { ...payload, updatedAt });

      return { message: "Task atualizada com sucesso" };
   }

   async destroy(taskId: string) {
      const taskRef = doc(db, "tasks", taskId);

      await deleteDoc(taskRef);
      return { message: "Task deletada com sucesso" };
   }
}
