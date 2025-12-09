from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TaskOut(BaseModel):
    id: int
    task_name: Optional[str] = None
    task_content: Optional[str] = None
    status: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
