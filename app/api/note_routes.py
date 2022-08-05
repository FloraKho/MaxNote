from tkinter import N
from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms.note_form import CreateNoteForm, UpdateNoteForm
from app.models import db, Note
import datetime

import os

note_routes = Blueprint('notes', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@note_routes.route('/users/<int:id>')
@login_required
def get_user_notes(id):
    notes = Note.query.filter(Note.user_id == id).all()
    return {'Notes': [note.to_dict() for note in notes]}

@note_routes.route('/<int:id>')
def get_one_note(id):
    note = Note.query.get(id)
    return note.to_dict()

@note_routes.route('', methods=['POST'])
def add_note():
    form = CreateNoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_note = Note(
            title = form.data['title'],
            content = form.data['content'],
            user_id = current_user.id,
            notebook_id= form.data['notebook_id'],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now()
        )

        db.session.add(new_note)
        db.session.commit()

        return new_note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@note_routes.route('/<int:id>', methods=['PUT'])
def edit_note(id):
    form = UpdateNoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        curr_note = Note.query.get(id)

        curr_note.title = form.data['title']
        curr_note.content = form.data['content']
        curr_note.notebook_id = form.data['notebook_id']
        curr_note.updated_at = datetime.datetime.now()

        db.session.commit()

        return curr_note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@note_routes.route('/<int:id>', methods=['DELETE'])
def delete_note(id):
    note = Note.query.get(id)
    db.session.delete(note)
    db.session.commit()
    return {'message': 'Successfully Delete.'}
