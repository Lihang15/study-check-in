from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from database import get_db, Task
from sqlalchemy.sql import text

app = FastAPI(title='Study Check-In')

@app.get('/ping-db')
def ping(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1 as ok")).fetchone()
    return{'db_ok':bool(result and result[0] == 1)}

# 获取Task表
@app.get("/getTasks", response_model=Dict[str, List[Dict[str, Any]]])
def get_all_tasks(db: Session = Depends(get_db)):
    """
    从 task 表中查询所有数据并返回。
    """
    # 1. 使用 SQLAlchemy ORM 查询所有 Task 对象
    tasks = db.query(Task).all()

    # 2. 将 ORM 对象转换为字典列表
    # 这一步是为了匹配你要求的 {tasks: [{}, {}]} 格式
    tasks_list = []
    for task in tasks:
        # 将 ORM 对象的属性转换为字典
        task_dict = {
            # 字段名称需要和你的 Task 模型保持一致
            "id": task.id,
            "title": task.task_name,
            "discription": task.task_content,
            "status": task.status,
            "created_at": task.created_at.isoformat() if task.created_at else None, # 转换为 ISO 8601 字符串
            "updated_at": task.updated_at.isoformat() if task.updated_at else None,
        }
        tasks_list.append(task_dict)

    # 3. 返回指定格式
    return {"tasks": tasks_list}

# 运行:
# uvicorn main:app --reload