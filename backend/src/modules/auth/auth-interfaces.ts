export interface UserRegisterPayload {
   email: string;
   name?: string;
   password: string;
   role?: string;
}

export interface User {
   email: string;
   name: string;
   password: string;
   role?: string;
   id?: number;
}

export interface UserLoginPayload {
   email: string;
   password: string;
}
