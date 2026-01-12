from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, records, task

app = FastAPI(title="Study Check-in")

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有源，生产环境建议指定具体域名
    # allow_origins=["http://localhost:3000", "https://yourdomain.com"]
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有HTTP方法
    allow_headers=["*"],  # 允许所有头部
)

# include routers
app.include_router(auth.router)
app.include_router(records.router)
app.include_router(task.router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", port=8000, reload=True)