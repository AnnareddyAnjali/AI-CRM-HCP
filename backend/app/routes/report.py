from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib import colors
import os

from app.database import get_db
from app.models.models import HCP, Interaction

router = APIRouter(
    prefix="/report",
    tags=["Reports"]
)


# ----------------------------
# HCP REPORT
# ----------------------------
@router.get("/hcp")
def export_hcp_report(db: Session = Depends(get_db)):

    hcps = db.query(HCP).all()

    data = [
        ["ID", "Name", "Hospital", "Speciality", "City"]
    ]

    for h in hcps:
        data.append([
            h.id,
            h.name,
            h.hospital,
            h.speciality,
            h.city
        ])

    os.makedirs("reports", exist_ok=True)

    file_path = "reports/HCP_Report.pdf"

    pdf = SimpleDocTemplate(file_path)

    table = Table(data)

    table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), colors.darkblue),
        ("TEXTCOLOR", (0,0), (-1,0), colors.white),
        ("GRID", (0,0), (-1,-1), 1, colors.black),
        ("BACKGROUND", (0,1), (-1,-1), colors.beige),
        ("BOTTOMPADDING", (0,0), (-1,0), 10),
    ]))

    pdf.build([table])

    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename="HCP_Report.pdf"
    )


# ----------------------------
# INTERACTION REPORT
# ----------------------------
@router.get("/interaction")
def export_interaction_report(db: Session = Depends(get_db)):

    interactions = db.query(Interaction).all()

    data = [
        [
            "ID",
            "HCP",
            "Date",
            "Type",
            "Sentiment"
        ]
    ]

    for i in interactions:
        data.append([
            i.id,
            i.hcp_id,
            str(i.date),
            i.interaction_type,
            i.sentiment
        ])

    os.makedirs("reports", exist_ok=True)

    file_path = "reports/Interaction_Report.pdf"

    pdf = SimpleDocTemplate(file_path)

    table = Table(data)

    table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), colors.darkgreen),
        ("TEXTCOLOR", (0,0), (-1,0), colors.white),
        ("GRID", (0,0), (-1,-1), 1, colors.black),
        ("BACKGROUND", (0,1), (-1,-1), colors.beige),
        ("BOTTOMPADDING", (0,0), (-1,0), 10),
    ]))

    pdf.build([table])

    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename="Interaction_Report.pdf"
    )