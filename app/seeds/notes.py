from app.models import db, Note
import datetime

def seed_notes():
    note1 = Note(
        title="Introducing JSX",
        content="React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display. You can put any valid JavaScript expression inside the curly braces in JSX. For example, 2 + 2, user.firstName, or formatName(user) are all valid JavaScript expressions. -- from Reactjs.org",
        user_id=1,
        notebook_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

    note2 = Note(
        title="Introduction to HTML",
        content="At its heart, HTML is a language made up of elements, which can be applied to pieces of text to give them different meaning in a document (Is it a paragraph? Is it a bulleted list? Is it part of a table?), structure a document into logical sections (Does it have a header? Three columns of content? A navigation menu?), and embed content such as images and videos into a page. This module will introduce the first two of these and introduce fundamental concepts and syntax you need to know to understand HTML.-- from MDN web docs",
        user_id=1,
        notebook_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

    note3 = Note(
        title="What is PostgreSQL?",
        content="PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads. The origins of PostgreSQL date back to 1986 as part of the POSTGRES project at the University of California at Berkeley and has more than 30 years of active development on the core platform.",
        user_id=1,
        notebook_id=2,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()        
    )

    note4 = Note(
        title="Sequelize",
        content="Sequelize is a modern TypeScript and Node.js ORM for Postgres, MySQL, MariaDB, SQLite and SQL Server, and more. Featuring solid transaction support, relations, eager and lazy loading, read replication and more.",
        user_id=1,
        notebook_id=2,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

    note5 = Note(
        title="Flask",
        content="Flask is a micro web framework written in Python. It is classified as a microframework because it does not require particular tools or libraries. It has no database abstraction layer, form validation, or any other components where pre-existing third-party libraries provide common functions.",
        user_id=1,
        notebook_id=2,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()    
    )


    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.add(note5)

    db.session.commit()


def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()