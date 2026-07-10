from fastapi import APIRouter, Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.models.models import Interaction
from app.schemas.interaction import InteractionCreate

from fastapi import APIRouter

router = APIRouter()


@router.post("/")
def create_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):

    new_interaction = Interaction(
        hcp_id=interaction.hcp_id,
        date=datetime.strptime(interaction.date, "%Y-%m-%d").date(),
        interaction_type=interaction.interaction_type,
        summary=interaction.summary,
        sentiment=interaction.sentiment,
        follow_up=interaction.follow_up
    )

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return {
        "message": "Interaction Saved Successfully",
        "data": new_interaction
    }


@router.get("/")
def get_interactions(db: Session = Depends(get_db)):
    return db.query(Interaction).all()

@router.put("/{interaction_id}")
def update_interaction(
    interaction_id: int,
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(Interaction).filter(
        Interaction.id == interaction_id
    ).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Interaction not found")

    existing.hcp_id = interaction.hcp_id
    existing.date = datetime.strptime(interaction.date, "%Y-%m-%d").date()
    existing.interaction_type = interaction.interaction_type
    existing.summary = interaction.summary
    existing.sentiment = interaction.sentiment
    existing.follow_up = interaction.follow_up

    db.commit()
    db.refresh(existing)

    return {
        "message": "Interaction Updated Successfully",
        "data": existing
    }


@router.delete("/{interaction_id}")
def delete_interaction(
    interaction_id: int,
    db: Session = Depends(get_db)
):
    existing = db.query(Interaction).filter(
        Interaction.id == interaction_id
    ).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Interaction not found")

    db.delete(existing)
    db.commit()

    return {
        "message": "Interaction Deleted Successfully"
    }