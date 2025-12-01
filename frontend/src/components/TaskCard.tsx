import React from 'react';
import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="card" style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      padding: '1rem'
    }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: 'bold', 
          color: '#334155', 
          marginBottom: '0.5rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>{task.title}</h3>
        <p style={{ 
          color: '#64748b', 
          marginBottom: '0.5rem',
          fontSize: '0.875rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>{task.task_content}</p>
      </div>
      <div style={{ 
        fontSize: '0.75rem', 
        color: '#94a3b8',
        marginTop: '0.5rem'
      }}>
        {formatDate(task.created_at)}
      </div>
      <div style={{ 
        display: 'flex', 
        gap: '0.25rem',
        marginTop: '0.75rem'
      }}>
        <button
          onClick={() => onEdit(task)}
          className="btn btn-primary"
          style={{ 
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            flex: 1
          }}
        >
          编辑
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn btn-danger"
          style={{ 
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            flex: 1
          }}
        >
          删除
        </button>
      </div>
    </div>
  );
};

export default TaskCard;