import React, { useState, useEffect } from 'react';
import type { Task } from '../types/task';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'> & { id?: number; created_at?: string; updated_at?: string }) => void;
  onCancel: () => void;
  showTitle?: boolean; // 新增属性，控制是否显示标题
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, showTitle = true }) => {
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
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {showTitle && (
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#334155', marginBottom: '1rem' }}>
          {task ? '编辑任务' : '添加新任务'}
        </h2>
      )}
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
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
        />
      </div>
      <div className="form-group" style={{ marginTop: '1rem' }}>
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
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', resize: 'vertical' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            backgroundColor: '#e2e8f0',
            color: '#334155',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          取消
        </button>
        <button
          type="submit"
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {task ? '更新任务' : '添加任务'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;