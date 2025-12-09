from sqlalchemy.orm import Session
from typing import List
from app.models.task import Task as TaskModel

def get_all_tasks(db: Session) -> List[TaskModel]:
    return db.query(TaskModel).all()
