# Steps to Setup:
1. Go to backend folder (cd backend)
2. Open virtual environment using
   - python -m venv env
   - source env/Scripts/activate
4. Run "pip3 install -r requirements.txt" (windows) 
3. Run "flask shell"
4. Now within flask shell:
 - run "db.create_all()"
5. Return to main directory (cd ..)
6. docker-compose up --build

# To view the database:
1. Install "SQLite Viewer"
2. Go to /backend/instance/db.sqlite3

# To clear or initialise database:
1. Go to /backend directory
2. bash db_controller.sh <clear/init/test>

# ENV File
1. Create .env file in same directory as .env.template
2. Copy content inside .env.template
3. Set FLASK_SECRET_KEY field to any string (e.g. JEMMA)
