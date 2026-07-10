from pydantic import BaseModel
from typing import Optional


class InteractionCreate(BaseModel):
    hcp_id: int
    date: str
    interaction_type: str
    summary: str
    sentiment: str
    follow_up: Optional[str] = None


class InteractionResponse(InteractionCreate):
    id: int

    class Config:
        from_attributes = True