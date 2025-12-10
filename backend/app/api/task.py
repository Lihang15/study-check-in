from fastapi import APIRouter, HTTPException
from typing import List

from app.schemas.task import TaskSchema  # <-- 加上这句
from app.service.task import TaskService

router = APIRouter()

@router.get("/getTasks", response_model=List[TaskSchema])  # <-- 改为 TaskSchema
def get_all_tasks():
    try:
        task_service = TaskService()
        tasks = task_service.get_all_tasks()
        return tasks  # 可以返回 SQLAlchemy，对应 orm_mode 自动转换
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取任务列表失败: {str(e)}")

@router.get("/tasks/{task_id}", response_model=TaskSchema)  # <-- 改为 TaskSchema
def get_task_by_id(task_id: int):
    task_service = TaskService()
    task = task_service.get_task_by_id(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="任务不存在")
    return task
