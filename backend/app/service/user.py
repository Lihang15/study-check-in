from sqlalchemy.orm import Session
from typing import List, Dict


from core.db import get_db
from app.models.user import User as UserModel


class UserService:
    """用户业务逻辑层，处理所有用户相关的业务逻辑"""

    def __init__(self):
        pass

    def _get_db(self) -> Session:
        """获取数据库会话"""
        return next(get_db())

    def get_all_users(self) -> List[UserModel]:
        """获取所有用户"""
        db = self._get_db()
        try:
            return db.query(UserModel).all()
        finally:
            db.close()
