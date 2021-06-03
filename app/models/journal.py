from .db import db

class Journal(db.Model):
   __tablename__ = 'journals'

   id = db.Column(db.Integer, primary_key=True)
   user_id = db.Column(db.Integer, db.ForeignKey('user.id')
   nullable=False)
   title = db.Column(db.String(25) nullable=False)
   entries = db.relationship('Entry', backref='journal', lazy=True)

   def to_dict(self):
      return {
         "user_id": self.user_id,
         "title": self.title_id
      }