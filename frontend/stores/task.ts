import { defineStore } from "pinia";

export interface TaskSavePayload {
  title: string;
  description: string;
  status: string;
  dueDate: Date | null | string;
}

interface TaskUpdatePayload {
  title?: string;
  description?: string;
  status?: string;
  dueDate?: Date | null | string;
}

export interface Task extends TaskSavePayload {
  uid: string;
}

export const useTaskStore = defineStore("task", {
  state: (): Task => ({
    uid: "",
    title: "",
    description: "",
    status: "",
    dueDate: null,
  }),

  actions: {
    async create(payload: TaskSavePayload) {
      try {
        const token = localStorage.getItem("token");
        const response = await $fetch<{ success: boolean; message: string }>(
          `${useNuxtApp().$config.public.baseUrl}/task`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: payload,
          }
        );

        return response;
      } catch (error: any) {
        console.error(error.data.message);
        return error.data;
      }
    },

    async getAll() {
      try {
        const token = localStorage.getItem("token");
        const response = await $fetch<{ success: boolean; tasks: Task[] }>(
          `${useNuxtApp().$config.public.baseUrl}/task`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response;
      } catch (error: any) {
        console.error(error.data.message || "Erro");
        return error.data;
      }
    },

    async getByUid(taskUid: string) {
      try {
        const token = localStorage.getItem("token");
        const response = await $fetch<{ success: boolean; task: Task }>(
          `${useNuxtApp().$config.public.baseUrl}/task/${taskUid}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response;
      } catch (error: any) {
        console.error(error.data.message || "Erro");
        return error.data;
      }
    },

    async search() {
      try {
        const token = localStorage.getItem("token");
        const response = await $fetch<{ success: boolean; tasks: Task[] }>(
          `${useNuxtApp().$config.public.baseUrl}/task/search`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response;
      } catch (error: any) {
        console.error(error.data.message || "Erro");
        return error.data;
      }
    },

    async update(taskUid: string, payload: TaskUpdatePayload) {
      try {
        const token = localStorage.getItem("token");
        const response = await $fetch<{ success: boolean; tasks: Task[] }>(
          `${useNuxtApp().$config.public.baseUrl}/task/${taskUid}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: payload,
          }
        );

        return response;
      } catch (error: any) {
        console.error(error.data.message || "Erro");
        return error.data;
      }
    },

    async delete(taskUid: string) {
      try {
        const token = localStorage.getItem("token");
        const response = await $fetch<{ success: boolean; message: string }>(
          `${useNuxtApp().$config.public.baseUrl}/task/${taskUid}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response;
      } catch (error: any) {
        console.error(error.data.message || "Erro");
        return error.data;
      }
    },
  },

  getters: {},
});
