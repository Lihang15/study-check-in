import React, { useState, useEffect } from 'react';
import type { Task } from '../types/task';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'> & { id?: number; created_at?: string; updated_at?: string }) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [taskContent, setTaskContent] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.task_name);
      setTaskContent(task.task_content || '');
    } else {
      setTitle('');
      setTaskContent('');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !taskContent.trim()) return;

    const formData = {
      id: task?.id,
      task_name: title,
      task_content: taskContent,
      created_at: task?.created_at || new Date().toISOString(),
      updated_at: task ? new Date().toISOString() : undefined
    };

    onSubmit(formData);
    setTitle('');
    setTaskContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-6">
      <div style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#334155', marginBottom: '1rem' }}>
          {task ? '编辑任务' : '添加新任务'}
        </h2>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            标题
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="请输入任务标题"
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskContent" className="form-label">
            内容
          </label>
          <textarea
            id="taskContent"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            rows={4}
            className="form-control"
            placeholder="请输入任务内容"
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline"
          >
            取消
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {task ? '更新任务' : '添加任务'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;