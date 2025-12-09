from fastapi import FastAPI
from .api import auth, records, task

app = FastAPI(title="Study Check-in")

# include routers
app.include_router(auth.router)
app.include_router(records.router)
app.include_router(task.router)