export interface Task {
  id: number;
  task_name: string;
  task_content?: string;
  status?: string;
  created_at?: string;  // 后端返回的是ISO字符串格式
  updated_at?: string;
}