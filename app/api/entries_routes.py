from flask import Blueprint
from app.models import Entry, db

entries_routes = Blueprint('entries', __name__)

@entries_routes.route('/<id>', methods=['GET'])
def get_entry(id):
   """
   Render's the selected entry
   """
   entry = Entry.query.get(id)
   return {"entry": entry.to_dict()}