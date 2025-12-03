from sqlalchemy import Column, Integer, String, DateTime, func
from app.database import Base

class Task(Base):
    '''
    任务表模型
    
    该类映射到数据库中的'task'表
    '''
    __tablename__ = "task"

    id = Column(Integer, primary_key=True, index=True)
    task_name = Column(String, index=True)
    task_content = Column(String)
    status = Column(String)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime)
