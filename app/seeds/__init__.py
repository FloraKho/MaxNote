from flask.cli import AppGroup

from app.seeds.notebooks import seed_notebooks, undo_notebooks
from app.seeds.notes import seed_notes, undo_notes
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_notebooks()
    seed_notes()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_notebooks()
    undo_notes()
