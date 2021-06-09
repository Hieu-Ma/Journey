from flask import Blueprint
from app.models import Entry, db
from app.forms import EntryForm

entries_routes = Blueprint('entries', __name__)

@entries_routes.route('/<id>', methods=['GET'])
def get_entry(id):
   """
   Render's the selected entry
   """
   entry = Entry.query.get(id)
   return {"entry": entry.to_dict()}

@entries_routes.route("/<id>/edit", methods=['POST'])
def create_entry(id):
   """
   Edits a selected entry
   """
   entry = Entry.query.get(id)
   form = EntryForm()
   new_entry = Entry(
      title = form.title.data,
      description = form.description.data,
   )
   entry.title = new_entry.title
   entry.description = new_entry.description
   db.session.add(entry)
   db.session.commit()
   return {"entry": entry.to_dict()}

@entries_routes.route("/<id>", methods=['DELETE'])
def delete_entry(id):
   """
   Deletes the user's selected entry
   """
   entry = Entry.query.get(id)
   db.session.delete(entry)
   db.session.commit()

   return {"entry": entry.to_dict()}