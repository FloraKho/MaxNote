from .db import db


class Notebook(db.Model):
    __tablename__ = "notebooks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="notebooks")
    notes = db.relationship("Note", back_populates="notebook", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id      
        }


