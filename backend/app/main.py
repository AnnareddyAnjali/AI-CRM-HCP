from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes.hcp import router as hcp_router
from app.routes.interaction import router as interaction_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI CRM HCP")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI CRM Backend Running"}

app.include_router(hcp_router, prefix="/hcp", tags=["HCP"])
app.include_router(interaction_router, prefix="/interaction", tags=["Interaction"])