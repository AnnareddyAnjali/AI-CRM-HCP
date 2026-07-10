from pydantic import BaseModel
from typing import Optional


class HCPCreate(BaseModel):
    name: str
    hospital: str
    speciality: str
    city: str
    email: Optional[str] = None
    phone: Optional[str] = None


class HCPResponse(HCPCreate):
    id: int

    class Config:
        from_attributes = True