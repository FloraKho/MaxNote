from tkinter.ttk import Notebook
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired


class CreateNoteForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    content = TextAreaField("content")
    notebook_id = IntegerField("notebook_id", validators=[DataRequired()])

class UpdateNoteForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    content = TextAreaField("content")
    notebook_id = IntegerField("notebook_id", validators=[DataRequired()])

