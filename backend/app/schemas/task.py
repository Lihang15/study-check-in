from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskSchema(BaseModel):
    id: Optional[int]
    task_name: str
    task_content: Optional[str] = None
    status: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UpdateTaskSchema(BaseModel):
    id: int
    task_name: Optional[str] = None
    task_content: Optional[str] = None
    status: Optional[str] = None


class DeleteTaskSchema(BaseModel):
    id: int
