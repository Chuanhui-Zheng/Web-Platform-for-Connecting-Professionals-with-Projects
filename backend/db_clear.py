from app import create_app
from extensions import db
from database.models import Company, Professional, Projects, Skills, Categories, Admin

app = create_app()
app.config.from_prefixed_env()


with app.app_context():
    try:
        # Delete all entries from each table without dropping tables
        db.session.query(Company).delete()
        db.session.query(Professional).delete()
        db.session.query(Projects).delete()
        db.session.query(Skills).delete()
        db.session.query(Categories).delete()
        db.session.query(Admin).delete()

        # Commit the deletions
        db.session.commit()
        print("All entries deleted successfully from db.sqlite3.")
    except Exception as e:
        db.session.rollback()  # Rollback if there's an error
        print("Error deleting entries:", str(e))