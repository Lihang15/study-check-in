from fastapi import FastAPI
from app.api.task_api import router as task_router

app = FastAPI(title='Study Check-In')
app.include_router(task_router)

# 运行:
# uvicorn main:app --reload




# 测试数据库连接是否正常
from fastapi import Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from app.database import get_db
from app.models.task import Task 

@app.get("/ping-db")
def ping_db(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1 as ok")).fetchone() 
    return {"db_ok": bool(result and result[0] == 1)}
