from app.models import db, Notebook
import datetime

def seed_notebooks():
    notebook1 = Notebook(
        title="Frontend",
        user_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

    notebook2 = Notebook(
        title="Backend",
        user_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )


    db.session.add(notebook1)
    db.session.add(notebook2)

    db.session.commit()

def undo_notebooks():
    db.session.execute('TRUNCATE notebooks RESTART IDENTITY CASCADE;')
    db.session.commit()