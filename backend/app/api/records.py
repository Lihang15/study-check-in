from fastapi import APIRouter

router = APIRouter()


@router.get("/records/ping")
def records_ping():
	return {"status": "records ok"}