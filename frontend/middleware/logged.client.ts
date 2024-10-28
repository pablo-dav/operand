// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    return; // it makes run only on client side
  }
  const authStore = useAuthStore();
  const isAuthenticated = await authStore.checkAuth();
  if (isAuthenticated) {
    return navigateTo("/");
  }
});
