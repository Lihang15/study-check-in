# study-check-in

需求分析

目标
任务管理
1.创建任务，查看任务，删除任务，修改任务
前端： lh
后端： cx

1.后端开发技术
fastapi + postgre

需准备dbeaver数据库可视化工具+postgre环境


# 结构

study-checkin/
│
├── frontend/                     # 前端 React 工程
│   ├── public/
│   ├── src/
│   │   ├── api/                  # 和后端的接口封装
│   │   ├── components/           # React 组件
│   │   ├── pages/                # 页面
│   │   ├── routes/               # 路由
│   │   ├── hooks/                # 自定义 Hooks
│   │   ├── utils/                # 工具函数
│   │   ├── store/                # 状态管理 (Redux / Zustand / Jotai)
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js            # 推荐用 Vite
│
├── backend/                      # 后端 FastAPI 工程
│   ├── app/
│   │   ├── api/                  # 路由层
│   │   │   ├── v1/
│   │   │   │   ├── checkin.py    # 示例：签到接口
│   │   │   │   └── users.py
│   │   │   └── __init__.py
│   │   ├── core/                 # 核心配置
│   │   │   ├── config.py         # 配置文件
│   │   │   ├── security.py
│   │   │   └── logging.py
│   │   ├── models/               # ORM 模型
│   │   │   ├── user.py
│   │   │   ├── checkin.py
│   │   │   └── __init__.py
│   │   ├── services/             # 业务逻辑（可选）
│   │   │   ├── user_service.py
│   │   │   └── checkin_service.py
│   │   ├── main.py               # FastAPI 入口
│   ├── alembic/                  # 数据库迁移（如使用则保留）
│   ├── requirements.txt
│   └── README.md
│
├── docker/                       # Docker 配置（可选）
│   ├── frontend.Dockerfile
│   ├── backend.Dockerfile
│   └── docker-compose.yml
├── ai-agent/                      # ai智能体-没准会写
└── README.md


## backend 项目启动说明
cd backend

# 创建虚拟环境（如已有可跳过）
uv venv
source .venv/bin/activate

# 安装依赖
uv pip install -r requirements.txt

# 运行 FastAPI
uv run uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload

# postgres 管理员可以看到所有数据库
用管理员账号连接到postgre，，创建check-in数据库
并创建task表

## frontend 项目启动说明
cd frontend
npm install -g pnpm 
pnpm install
pnpm run dev