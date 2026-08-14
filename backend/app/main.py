from fastapi import FastAPI

from app.api.routes.auth import router as auth_router
from app.db.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Backend",
    version="1.0.0",
)

app.include_router(auth_router)

@app.get("/health")
def health():
    return{
        "status": "healthy",
    }