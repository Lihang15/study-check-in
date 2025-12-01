import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import type { Task } from '../types/task';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 模拟从API获取数据
  useEffect(() => {
    // 模拟API调用延迟
    setTimeout(() => {
      const mockTasks: Task[] = [
        {
          id: '1',
          title: '学习日语',
          task_content: '完成日语第一单元',
          created_at: new Date('2023-05-01'),
          updated_at: new Date('2023-05-02')
        },
        {
          id: '2',
          title: '学习PyTorch',
          task_content: '掌握PyTorch的基本语法和高级特性',
          created_at: new Date('2023-05-03')
        },
        {
          id: '3',
          title: '学习fastApi ',
          task_content: '了解fastApi 的基础知识和应用场景',
          created_at: new Date('2023-05-05')
        },
        {
          id: '4',
          title: '学习数据库',
          task_content: '掌握SQL和NoSQL数据库的基本操作',
          created_at: new Date('2023-05-07')
        }
      ];
      setTasks(mockTasks);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddTask = (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: Date; updated_at?: Date }) => {
    if (taskData.id) {
      // 更新任务
      setTasks(tasks.map(task => 
        task.id === taskData.id 
          ? { ...task, title: taskData.title, task_content: taskData.task_content, updated_at: new Date() } 
          : task
      ));
      setEditingTask(null);
    } else {
      // 添加新任务
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title,
        task_content: taskData.task_content,
        created_at: taskData.created_at || new Date()
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
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

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
     
      

      
      {/* 任务列表 */}
      <div style={{ marginTop: '2rem', marginBottom:'100px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#334155', marginBottom: '1rem' }}>晨曦的任务列表</h2>
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

            {/* 任务表单 */}
      <TaskForm 
        task={editingTask} 
        onSubmit={handleAddTask} 
        onCancel={handleCancelEdit} 
      />
    </div>
  );
};

export default TaskManager;