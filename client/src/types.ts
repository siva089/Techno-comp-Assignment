

export enum TaskStatus {
    Todo = "To Do",
    InProgress = "In Progress",
    Done = "Done",
  }
  export enum TaskPriority {
    High = "High",
    Medium = "Medium",
    Low = "Low",
  }
  export interface Task {
    _id?:string;
    id: string;
    name: string;
    priority: TaskPriority;
    status: TaskStatus;
  }