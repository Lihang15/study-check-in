from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskSchema(BaseModel):
    id: Optional[int] = None
    task_name: str
    task_content: Optional[str] = None
    status: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UpdateTaskSchema(BaseModel):
    task_name: Optional[str] = None
    task_content: Optional[str] = None
    status: Optional[str] = None


# 删除 DeleteTaskSchema，因为 id 将通过路径参数传递
