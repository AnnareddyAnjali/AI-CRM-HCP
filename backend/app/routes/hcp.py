from fastapi import APIRouter, Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import HCP
from app.schemas.hcp import HCPCreate


router = APIRouter()


@router.post("/")
def create_hcp(hcp: HCPCreate, db: Session = Depends(get_db)):
    new_hcp = HCP(
        name=hcp.name,
        hospital=hcp.hospital,
        speciality=hcp.speciality,
        city=hcp.city,
        email=hcp.email,
        phone=hcp.phone
    )

    db.add(new_hcp)
    db.commit()
    db.refresh(new_hcp)

    return {
        "message": "HCP Created Successfully",
        "data": new_hcp
    }


@router.get("/")
def get_all_hcps(db: Session = Depends(get_db)):
    hcps = db.query(HCP).all()
    return hcps

@router.put("/{hcp_id}")
def update_hcp(hcp_id: int, hcp: HCPCreate, db: Session = Depends(get_db)):
    existing = db.query(HCP).filter(HCP.id == hcp_id).first()

    if not existing:
        raise HTTPException(status_code=404, detail="HCP not found")

    existing.name = hcp.name
    existing.hospital = hcp.hospital
    existing.speciality = hcp.speciality
    existing.city = hcp.city
    existing.email = hcp.email
    existing.phone = hcp.phone

    db.commit()
    db.refresh(existing)

    return {
        "message": "HCP Updated Successfully",
        "data": existing
    }


@router.delete("/{hcp_id}")
def delete_hcp(hcp_id: int, db: Session = Depends(get_db)):
    existing = db.query(HCP).filter(HCP.id == hcp_id).first()

    if not existing:
        raise HTTPException(status_code=404, detail="HCP not found")

    db.delete(existing)
    db.commit()

    return {
        "message": "HCP Deleted Successfully"
    }