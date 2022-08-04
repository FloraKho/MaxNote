from .db import db


class Notebook(db.Model):
    __tablename__ = "notebooks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    # updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    
    user = db.relationship("User", back_populates="notebooks")
    notes = db.relationship("Note", back_populates="notebook", cascade="all, delete-orphan")



    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id,
            "user": self.user.to_dict(),
            "created_at": self.created_at, 
            # "updated_at": self.updated_at
        }


