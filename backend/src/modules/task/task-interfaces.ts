export interface TaskSchema {
   uid: string;
   title: string;
   description: string;
   status: string;
   dueDate: Date;
}

// Fetch

// Save
export interface TaskSavePayload {
   title: string;
   description: string;
   status: string;
   dueDate: Date;
}

// Update
export interface TaskUpdatePayload {
   title?: string;
   description?: string;
   status?: string;
   dueDate?: Date;
}

// Destroy
