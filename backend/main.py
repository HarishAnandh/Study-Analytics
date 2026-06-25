from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base
from models import Subject

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

@app.get("/")
def home():
     return {"message": "Study Analytics API Running"}

@app.get("/subjects")
def get_subjects():
    db: Session = SessionLocal()

    subjects = db.query(Subject).all()

    result = []

    for s in subjects:
        result.append({
            "id": s.id,
            "name": s.name,
            "difficulty": s.difficulty,
            "proficiency": s.proficiency,
            "priority": s.priority
        })

    db.close()

    return result


@app.post("/subjects")
def add_subject(subject: dict):
    db: Session = SessionLocal()

    new_subject = Subject(
        name=subject["name"],
        difficulty=int(subject["difficulty"]),
        proficiency=int(subject["proficiency"]),
        priority=int(subject["priority"])
    )

    db.add(new_subject)
    db.commit()
    db.refresh(new_subject)

    db.close()

    return {"message": "Subject Added"}

@app.delete("/subjects/{subject_id}")
def delete_subject(subject_id: int):
    db: Session = SessionLocal()

    subject = (
        db.query(Subject)
        .filter(Subject.id == subject_id)
        .first()
    )

    if not subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found"
        )

    db.delete(subject)
    db.commit()

    db.close()

    return {"message": "Subject deleted"}
