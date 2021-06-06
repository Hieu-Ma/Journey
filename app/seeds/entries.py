from app.models import db, Entry

# Adds a demo user, you can add other users here if you want
def seed_entries():

    demo_entry_1 = Entry(journal_id=1, title='Entry 1', description='test1')
    demo_entry_2 = Entry(journal_id=1, title='Entry 2', description='test2')
    demo_entry_3 = Entry(journal_id=1, title='Entry 3', description='test3')
    demo_entry_4 = Entry(journal_id=1, title='Entry 4', description='test4')
    demo_entry_5 = Entry(journal_id=1, title='Entry 5', description='test5')
    demo_entry_6 = Entry(journal_id=1, title='Entry 6', description='test6')
    demo_entry_7 = Entry(journal_id=1, title='Entry 7', description='test7')
    demo_entry_8 = Entry(journal_id=1, title='Entry 8', description='test8')
    demo_entry_9 = Entry(journal_id=1, title='Entry 9', description='test9')
    db.session.add(demo_entry_1)
    db.session.add(demo_entry_2)
    db.session.add(demo_entry_3)
    db.session.add(demo_entry_4)
    db.session.add(demo_entry_5)
    db.session.add(demo_entry_6)
    db.session.add(demo_entry_7)
    db.session.add(demo_entry_8)
    db.session.add(demo_entry_9)
    db.session.commit()

# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and resets
# # the auto incrementing primary key
def undo_entries():
    db.session.execute('TRUNCATE entries RESTART IDENTITY CASCADE;')
    db.session.commit()
