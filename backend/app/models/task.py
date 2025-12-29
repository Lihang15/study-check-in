from sqlalchemy import Column, Integer, String, DateTime, func
from app.core.db import Base


class Task(Base):
    """
    类 Task 映射到数据库中的 'task' 表
    """

    # 需要连接的table的名称
    __tablename__ = "task"

    # 这个table的所有字段及其属性
    id = Column(
        Integer, primary_key=True, index=True
    )  # primary_key=True：将该字段设为主键，index=True：自动排序
    task_name = Column(String, index=True)
    task_content = Column(String)
    status = Column(String)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime)
