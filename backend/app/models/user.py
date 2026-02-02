from sqlalchemy import Column, Integer, String, DateTime, func

from app.core.db import Base


class User(Base):
    """
    类 User 映射到数据库中的 'user' 表
    """

    # 指定连接的table名称
    __tablename__ = "user"

    # 定义所有字段及其属性
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String, nullable=False)
    created_time = Column(DateTime, server_default=func.now(), nullable=False)
    updated_time = Column(DateTime, onupdate=func.now(), nullable=False)
