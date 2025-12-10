from sqlalchemy.orm import Session
from typing import List, Optional, Dict
from app.models.task import Task as TaskModel
from app.core.db import get_db


class TaskService:
    """任务业务逻辑层，处理所有任务相关的业务逻辑"""
    
    def __init__(self):
        pass
    
    def _get_db(self) -> Session:
        """获取数据库会话"""
        return next(get_db())
    
    def get_all_tasks(self) -> List[TaskModel]:
        """获取所有任务"""
        db = self._get_db()
        try:
            return db.query(TaskModel).all()
        finally:
            db.close()
    
    def get_task_by_id(self, task_id: int) -> Optional[TaskModel]:
        """根据ID获取单个任务"""
        db = self._get_db()
        try:
            return db.query(TaskModel).filter(TaskModel.id == task_id).first()
        finally:
            db.close()
    
    def create_task(self, task_data: Dict) -> TaskModel:
        """创建新任务"""
        db = self._get_db()
        try:
            # 可以在这里添加业务逻辑验证
            db_task = TaskModel(**task_data)
            db.add(db_task)
            db.commit()
            db.refresh(db_task)
            return db_task
        finally:
            db.close()
    
    def update_task(self, task_id: int, update_data: Dict) -> Optional[TaskModel]:
        """更新任务"""
        db = self._get_db()
        try:
            # 可以在这里添加业务逻辑验证
            task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
            if task:
                for key, value in update_data.items():
                    setattr(task, key, value)
                db.commit()
                db.refresh(task)
            return task
        finally:
            db.close()
    
    def delete_task(self, task_id: int) -> bool:
        """删除任务"""
        db = self._get_db()
        try:
            # 可以在这里添加业务逻辑验证（如检查是否可以删除）
            task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
            if task:
                db.delete(task)
                db.commit()
                return True
            return False
        finally:
            db.close()
