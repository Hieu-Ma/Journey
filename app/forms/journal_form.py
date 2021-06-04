from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class JournalForm(FlaskForm):
   title = StringField('title', validators=[DataRequired()])