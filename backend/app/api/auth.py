from fastapi import APIRouter

router = APIRouter()

@router.get("/auth/ping")
def auth_ping():
	return {"status": "auth ok"}