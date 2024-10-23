export interface TaskSchema {
   uid: string;
   title: string;
   description: string;
   status: string;
   priority: string;
   dueDate: Date;
   tags: string[];
   createdAt: Date;
   updatedAt: Date;
}

// Fetch

// Save
export interface TaskSavePayload {
   title: string;
   description: string;
   status: string;
   priority: string;
   dueDate: Date;
   tags: string[];
   createdAt: Date;
   updatedAt: Date;
}

// Update
export interface TaskUpdatePayload {
   title?: string;
   description?: string;
   status?: string;
   priority?: string;
   dueDate?: Date;
   tags?: string[];
   createdAt?: Date;
   updatedAt?: Date;
}

// Destroy
