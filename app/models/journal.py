from .db import db

class Journal(db.Model):
   __tablename__ = 'journals'

   id = db.Column(db.Integer, primary_key=True)
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
   title = db.Column(db.String(25), nullable=False)
   user = db.relationship('User', cascade = "all,delete", back_populates='journals')
   entries = db.relationship('Entry', cascade = "all,delete", back_populates='journal', lazy=True)

   def to_dict(self):
      return {
         "user_id": self.user_id,
         "title": self.title
      }