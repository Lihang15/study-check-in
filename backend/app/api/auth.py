from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.user import UserSchema
from app.service.user import UserService


router = APIRouter()


@router.get("/auth/ping")
def auth_ping():
    return {"status": "auth ok"}


@router.get("/getUser", response_model=List[UserSchema])
def get_all_users():
    try:
        user_service = UserService()
        users = user_service.get_all_users()
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取用户列表失败: {str(e)}")
