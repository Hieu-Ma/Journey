from flask import Blueprint
from flask_login import current_user
from app.models import Journal, User

journals_routes = Blueprint('journals', __name__)

@journals_routes.route("", methods=['GET'])
def journals():
   """
   Render's the user's journals on the home page
   """
   user_id = current_user.id
   user = User.query.get(user_id)
   return {"journals": [{"id": journal.id, "title":journal.title} for journal in user.journals]}
