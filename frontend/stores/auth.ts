// stores/auth.ts
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

// Tipos para as credenciais de login e o usuário
interface Credentials {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  actions: {
    async login(credentials: Credentials) {
      try {
        const response = await $fetch<{
          success: boolean;
          user: User;
          token: string;
        }>(`${useNuxtApp().$config.public.baseUrl}/auth/login`, {
          method: "POST",
          body: credentials,
        });

        this.user = response.user;
        this.token = response.token;

        localStorage.setItem("token", response.token);

        useNuxtApp().$router.push("/");
      } catch (error: any) {
        console.error(error.data.message);
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");

      const router = useRouter();
      router.push("/login");
    },

    async checkAuth() {
      const token = localStorage.getItem("token");
      try {
        const response = await $fetch<{
          success: boolean;
          user: User;
        }>(`${useNuxtApp().$config.public.baseUrl}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.success) {
          this.user = response.user;
        }

        return response.success;
      } catch (error: any) {
        console.error(error.data.message || "Erro");
      }
    },
  },

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },
});
