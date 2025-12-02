export interface Task {
  id: string;
  title: string;
  task_content: string;
  created_at: Date;
  updated_at?: Date;
}