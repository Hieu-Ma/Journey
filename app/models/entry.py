from .db import db

class Entry(db.Model):
   __tablename__ = 'entries'

   id = db.Column(db.Integer, primary_key = True)
   journal_id = db.Column(db.Integer, db.ForeignKey('journals.id'), nullable = False)
   title = db.Column(db.String(25), nullable = False)
   description = db.Column(db.String(1000), nullable = False)
   journal = db.relationship('Journal', back_populates='entries')
  
   def to_dict(self):
      return {
         "id": self.id,
         "journal_id": self.journal_id,
         "journal_title": self.journal.title,
         "title": self.title,
         "description": self.description
      }