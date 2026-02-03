from fastapi import APIRouter, HTTPException
from typing import List

from app.schemas.task import TaskSchema, UpdateTaskSchema
from app.service.task import TaskService

router = APIRouter()

@router.get("/getTasks", response_model=List[TaskSchema])  # <-- 改为 TaskSchema
def get_all_tasks():
    try:
        task_service = TaskService()
        tasks = task_service.get_all_tasks()
        # 确保返回可序列化的列表：过滤掉可能为 None 的项，防止 FastAPI 响应验证错误
        if tasks is None:
            return []
        return [t for t in tasks if t is not None]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取任务列表失败: {str(e)}")

@router.get("/tasks/{task_id}", response_model=TaskSchema)  # <-- 改为 TaskSchema
def get_task_by_id(task_id: int):
    task_service = TaskService()
    task = task_service.get_task_by_id(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="任务不存在")
    return task

@router.post("/createTasks", response_model=dict)
def create_task(task: TaskSchema):
    task_service = TaskService()
    task_data = task.dict()
    try:
        new_task = task_service.create_task(task_data)
        if new_task:
            return {"status": True}
    except Exception:
        return {"status": False}


@router.post("/updateTask/{task_id}", response_model=dict)
def update_task(task_id: int, task: UpdateTaskSchema):
    task_service = TaskService()
    update_data = task.dict(exclude_unset=True)
    try:
        updated = task_service.update_task(task_id, update_data)
        if updated:
            return {"status": True}
        return {"status": False, "detail": "任务不存在或未更新"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"更新任务失败: {str(e)}")


@router.post("/deleteTask/{task_id}", response_model=dict)
def delete_task(task_id: int):
    task_service = TaskService()
    try:
        success = task_service.delete_task(task_id)
        return {"status": bool(success)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"删除任务失败: {str(e)}")
