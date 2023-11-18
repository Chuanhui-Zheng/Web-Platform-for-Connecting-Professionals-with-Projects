# Steps to Setup:
1. Go to backend folder (cd backend)
2. Open virtual environment using
   - python -m venv env
   - source env/Scripts/activate
4. Run 
 - "pip3 install -r requirements.txt" (windows) 
3. Run "flask shell"
4. Now within flask shell:
 - Within flask shell, run "db.create_all()"
5. Return to main directory (cd ..)
6. docker-compose up --build

# To view the database:
1. Install "SQLite Viewer"
2. Go to /backend/instance/db.sqlite3

# To clear or initialise database:
1. Go to /backend directory
2. bash db_controller.sh <clear/init/test>
