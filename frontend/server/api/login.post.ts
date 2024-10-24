// server/api/login.post.ts
import { H3Event, defineEventHandler, readBody } from "h3";

interface LoginBody {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user: { name: string };
  token: string;
}

export default defineEventHandler(
  async (event: H3Event): Promise<LoginResponse> => {
    const body = await readBody<LoginBody>(event);

    if (body.email === "admin@a" && body.password === "123456") {
      return {
        success: true,
        user: { name: "Admin" },
        token: "token-simulacao-123456",
      };
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: "Credenciais inválidas",
      });
    }
  }
);
