from fastapi import FastAPI

from app.api.routes.chat import router as chat_router

app = FastAPI(
    title="AI Backend",
    version="1.0.0",
)

app.include_router(chat_router)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}