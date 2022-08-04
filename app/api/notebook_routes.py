from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms.notebook_form import CreateNotebookForm, UpdateNotebookForm
from app.models import db, Notebook, Note
import datetime

import os

notebook_routes = Blueprint('notebooks', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@notebook_routes.route('')
def get_user_notebooks():
    notebooks = Notebook.query.filter(Notebook.user_id == current_user.id).all()
    return {'Notebooks': [notebook.to_dict() for notebook in notebooks]}

@notebook_routes.route('/<int:id>/notes')
def get_notebook_notes(id):
    notes = Note.query.filter(Note.notebook_id == id)
    return {'Notes': [note.to_dict() for note in notes]}

@notebook_routes.route('', methods=['POST'])
def add_notebook():
    form = CreateNotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_notebook = Notebook(
            title = form.data['title'],
            user_id = current_user.id,
            created_at=datetime.datetime.now(),
            # updated_at=datetime.datetime.now(),
        )

        db.session.add(new_notebook)
        db.session.commit()

        return new_notebook.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@notebook_routes.route('/<int:id>', methods=['PUT'])
def edit_notebook(id):
    form = UpdateNotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        curr_notebook = Notebook.query.get(id)

        curr_notebook.title = form.data['title']

        db.session.commit()
        return curr_notebook.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@notebook_routes.route('/<int:id>', methods=['DELETE'])
def delete_notebook(id):
    notebook = Notebook.query.get(id)
    db.session.delete(notebook)
    db.session.commit()
    return {'message': 'Successfully Delete.'}
