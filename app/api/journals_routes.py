from flask import Blueprint
from flask_login import current_user
from app.models import Journal, User, db
from app.forms import JournalForm

journals_routes = Blueprint('journals', __name__)

@journals_routes.route("", methods=['GET'])
def journals():
   """
   Render's the user's journals on the home page
   """
   user_id = current_user.id
   user = User.query.get(user_id)
   return {"journals": [{"id": journal.id, "title":journal.title} for journal in user.journals]}

@journals_routes.route("", methods=['POST'])
def create_journal():
   """
   Creates a new journal
   """
   form = JournalForm()
   new_journal = Journal(
      user_id= current_user.id,
      title = form.title.data,
   )
   db.session.add(new_journal)
   db.session.commit()
   return {"created": new_journal.to_dict()}