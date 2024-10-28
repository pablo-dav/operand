export interface SearchPayload {
   search: string;
   order?: { by: string; direction: "asc" | "desc" };
   pagination?: { page: number; limit: number };
}

export interface SearchGetPayload {
   page?: string;
   take?: string;
}

export interface SearchDatabase {
   where?: {
      OR?: Array<{}>;
      AND?: Array<{}>;
   };
   orderBy?: {};
   take?: number;
   skip?: number;
}
