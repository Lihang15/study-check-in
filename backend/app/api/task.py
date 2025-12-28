from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any

# 从 database.py 中导入会话依赖函数
from app.core.db import get_db
# 从 app.models.task 中导入 ORM 模型
from app.models.task import Task 
# 从 app.schemes.task 中导入模型的配置
from app.schemas.task import TaskOut
# 从 app.service.task 中导入获取所有task的函数
from app.service.task import get_all_tasks

# 创建一个 APIRouter 实例，用于组织路由
router = APIRouter()

# 接口路径: /getTasks
@router.get("/getTasks", response_model=List[TaskOut])
def get_all_tasks(db: Session = Depends(get_db)):
    """
    从 task 表中查询所有数据并返回（以 Pydantic 模型序列化）
    """
    # 查询 Task 对象的所有数据
    tasks = get_all_tasks(db)

    # 直接返回 ORM 对象列表，FastAPI 会使用 Pydantic 的 orm_mode 进行序列化
    return tasks