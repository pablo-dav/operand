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
        }>("/api/v1/login", {
          method: "POST",
          body: credentials,
        });

        this.user = response.user;
        this.token = response.token;

        localStorage.setItem("token", response.token);

        const router = useRouter();
        router.push("/");
      } catch (error: any) {
        console.error(error.response.message);
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");

      const router = useRouter();
      router.push("/login");
    },

    checkAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
      }
    },
  },

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },
});
