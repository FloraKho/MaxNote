from flask import Flask
from flask_wtf import FlaskForm
from wtforms import TextAreaField

class AddScratchPad(FlaskForm):
    scratch_pad = TextAreaField("scratch_pad")