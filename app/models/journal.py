from .db import db

class Journal(db.Model):
   __tablename__ = 'journals'

   id = db.Column(db.Integer, primary_key=True)
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
   title = db.Column(db.String(20), nullable=False)
   user = db.relationship('User', back_populates='journals')
   entries = db.relationship('Entry', cascade = "all, delete, delete-orphan", back_populates='journal', lazy=True)

   def to_dict(self):
      return {
         "id": self.id,
         "user_id": self.user_id,
         "title": self.title
      }