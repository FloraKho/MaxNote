from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class CreateNotebookForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])

class UpdateNotebookForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])