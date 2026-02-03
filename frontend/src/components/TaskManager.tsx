import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import type { Task } from '../types/task';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // 从API获取任务数据
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('http://localhost:8001/getTasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error('获取任务失败:', err);
      setError(err instanceof Error ? err.message : '获取任务失败');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'> & { id?: number; created_at?: string; updated_at?: string }) => {
    try {
      if (taskData.id) {
        // 更新任务
        const response = await fetch(`http://localhost:8001/updateTask/${taskData.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            task_name: taskData.task_name,
            task_content: taskData.task_content,
            status: taskData.status || 'pending'
          }),
        });

        if (!response.ok) {
          throw new Error('更新任务失败');
        }
        
        await fetchTasks();
        setEditingTask(null);
      } else {
        // 添加新任务
        const response = await fetch('http://localhost:8001/createTasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            task_name: taskData.task_name,
            task_content: taskData.task_content,
            status: 'pending'
          }),
        });

        if (!response.ok) {
          throw new Error('创建任务失败');
        }

        await fetchTasks();
      }
      setShowAddForm(false);
    } catch (err) {
      console.error('操作失败:', err);
      alert(err instanceof Error ? err.message : '操作失败');
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (window.confirm('确定要删除这个任务吗？')) {
      try {
        const response = await fetch(`http://localhost:8001/deleteTask/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('删除任务失败');
        }

        await fetchTasks();
      } catch (err) {
        console.error('删除失败:', err);
        alert(err instanceof Error ? err.message : '删除失败');
      }
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowAddForm(false);
  };

  const handleShowAddForm = () => {
    setEditingTask(null);
    setShowAddForm(true);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '16rem' }}>
        <div style={{
          width: '3rem',
          height: '3rem',
          border: '4px solid #e2e8f0',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '1rem',
        textAlign: 'center'
      }}>
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '0.5rem',
          padding: '1rem',
          color: '#dc2626'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            获取任务失败
          </h3>
          <p>{error}</p>
          <button 
            onClick={fetchTasks}
            style={{
              marginTop: '1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
     
      
      {/* 任务列表 */}
      <div style={{ marginTop: '2rem', marginBottom:'100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#334155' }}>晨曦的任务列表</h2>
          <button
            onClick={handleShowAddForm}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            添加新任务
          </button>
        </div>
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted">
            暂无任务，请添加新任务
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onDelete={handleDeleteTask} 
                onEdit={handleEditTask} 
              />
            ))}
          </div>
        )}
      </div>

      {/* 任务表单弹窗 */}
      {showAddForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={handleCancelEdit}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
            <TaskForm 
              task={null} 
              onSubmit={handleAddTask} 
              onCancel={handleCancelEdit}
              showTitle={false}
            />
          </div>
        </div>
      )}
      
      {/* 编辑任务表单 */}
      {editingTask && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={handleCancelEdit}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
            <TaskForm 
              task={editingTask} 
              onSubmit={handleAddTask} 
              onCancel={handleCancelEdit}
              showTitle={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;