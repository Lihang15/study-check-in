from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# 建立与数据库的连接
DATABASE_URL = "postgresql+psycopg2://aurora@localhost:5432/postgres"
engine = create_engine(DATABASE_URL, echo=True, pool_pre_ping=True)

# 创建 Session（会话）类 用于数据库交互
# sessionmaker()是一个工厂函数，接受配置参数，然后返回一个配置好的类（Class）
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 创建ORM模型的Base类（所有模型的基础）
Base = declarative_base()


# “会话依赖函数”
# 适配 FastAPI 的 Depends，用于在每次请求中 打开/关闭 数据库会话
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


