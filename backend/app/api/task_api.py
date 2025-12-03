from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any

# 从 database.py 中导入会话依赖函数
from app.database import get_db

# 从 app.models.task 中导入 ORM 模型
from app.models.task import Task 

# 创建一个 APIRouter 实例，用于组织路由
# 后续可以在这里设置统一的前缀，例如 prefix="/tasks"
router = APIRouter()

# 接口路径: /getTasks
@router.get("/getTasks", response_model=Dict[str, List[Dict[str, Any]]])
def get_all_tasks(db: Session = Depends(get_db)):
    """
    从task表中查询所有数据并返回
    """
    # 1.查询Task对象的所有数据
    tasks = db.query(Task).all()

    # 2.转换为字典列表
    tasks_list = []
    for task in tasks:
        # 将ORM对象的属性转换为字典
        task_dict = {
            "id": task.id,
            "title": task.task_name,
            "description": task.task_content,
            "created_at": task.created_at.isoformat() if task.created_at else None, # 转换为 ISO 8601 字符串
            "updated_at": task.updated_at.isoformat() if task.updated_at else None,
        }
        tasks_list.append(task_dict)

    # 3.返回
    return {"tasks": tasks_list}