from flask import Blueprint
from flask_login import current_user
from app.models import Journal, Entry, User, db
from app.forms import JournalForm
from app.forms import EntryForm

journals_routes = Blueprint("journals", __name__)

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

@journals_routes.route("/<id>", methods=['GET'])
def get_journal(id):
   """
   Render's the user's selected journal
   """
   journal = Journal.query.get(id)
   entries = Entry.query.filter_by(journal_id=id).order_by(Entry.id)

   return {
      "journal": journal.to_dict(),
      "entries": [entry.to_dict() for entry in entries]
      }

@journals_routes.route("/<id>", methods=['POST'])
def rename_journal(id):
   """
   Renames the user's selected journal
   """
   journal = Journal.query.get(id)
   form = JournalForm()
   test_journal = Journal(
      user_id= current_user.id,
      title = form.title.data,
   )
   journal.title = test_journal.title
   db.session.add(journal)
   db.session.commit()

   return {
      "journal": journal.to_dict()
   }

@journals_routes.route("/<id>", methods=['DELETE'])
def delete_journal(id):
   """
   Deletes the user's selected journal
   """
   journal = Journal.query.get(id)
   db.session.delete(journal)
   db.session.commit()

   return {
      "journal": journal.to_dict()
   }

@journals_routes.route("/<id>/create", methods=['POST'])
def create_entry(id):
   """
   Creates a entry on the selected journal
   """
   form = EntryForm()
   new_entry = Entry(
      journal_id = id,
      title = form.title.data,
      description = form.description.data,
   )
   db.session.add(new_entry)
   db.session.commit()
   return {"entry": new_entry.to_dict()}
