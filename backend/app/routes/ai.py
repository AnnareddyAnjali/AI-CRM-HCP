from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import HCP, Interaction
from app.ai.groq_client import client, MODEL

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class SummaryRequest(BaseModel):
    text: str


class ChatRequest(BaseModel):
    question: str


@router.post("/summary")
def generate_summary(data: SummaryRequest):

    prompt = f"""
You are an AI assistant for a Pharmaceutical CRM.

Analyze this doctor interaction.

Return:

Summary:
...

Sentiment:
...

Recommendation:
...

Interaction:
{data.text}
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "result": response.choices[0].message.content
    }


@router.post("/chat")
def chat_ai(data: ChatRequest, db: Session = Depends(get_db)):

    hcps = db.query(HCP).all()
    interactions = db.query(Interaction).all()

    hcp_text = ""

    for h in hcps:
        hcp_text += f"""
ID: {h.id}
Name: {h.name}
Hospital: {h.hospital}
Speciality: {h.speciality}
City: {h.city}

"""

    interaction_text = ""

    for i in interactions:
        interaction_text += f"""
HCP ID: {i.hcp_id}
Date: {i.date}
Type: {i.interaction_type}
Sentiment: {i.sentiment}
Summary: {i.summary}
Follow-up: {i.follow_up}

"""

    prompt = f"""
You are an AI CRM Assistant.

Below is the CRM database.

Healthcare Professionals

{hcp_text}

Interactions

{interaction_text}

Answer ONLY using this data.

If the answer is not available,
say:

'No information available in CRM.'

Question:

{data.question}
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
    )

    return {
        "answer": response.choices[0].message.content
    }