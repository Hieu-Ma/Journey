from app.models import db, Journal

# Adds a demo user, you can add other users here if you want
def seed_journals():

    demo_journal_1 = Journal(user_id=1, title='Morning Journal')
    demo_journal_2 = Journal(user_id=1, title='EOD')
    demo_journal_3 = Journal(user_id=1, title='Workout')
    db.session.add(demo_journal_1)
    db.session.add(demo_journal_2)
    db.session.add(demo_journal_3)
    db.session.commit()

# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and resets
# # the auto incrementing primary key
def undo_journals():
    db.session.execute('TRUNCATE journals RESTART IDENTITY CASCADE;')
    db.session.commit()
