from fastapi import FastAPI
from app.api import auth, records, task

app = FastAPI(title="Study Check-in")

app.include_router(auth.router)
app.include_router(records.router)
app.include_router(task.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)