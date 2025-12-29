from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class UserSchema(BaseModel):
    id: int
    username: str
    password: str
    created_time: datetime
    updated_time: Optional[datetime] = None

    class Config:
        from_attributes = True
