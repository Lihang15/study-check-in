from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 建立与数据库的连接
DATABASE_URL = "postgresql+psycopg2://aurora@localhost:5432/postgres"
engine = create_engine(DATABASE_URL, echo=True, pool_pre_ping=True)

# 创建 SessionLocal 类对象用于数据库会话
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 生成器函数
# 适配 FastAPI 的 Depends，用于在每次请求中打开/关闭 DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 使用 ORM，定义模型
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Task(Base):
    __tablename__ = "task"

    id = Column(Integer, primary_key=True, index=True)
    task_name = Column(String, index=True)
    task_content = Column(String)
    status = Column(String)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
