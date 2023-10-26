# Steps to Setup:

1. Go to backend folder (cd backend)
2. Run 
 - "pip3 install -r requirements.txt" (mac)
 - "pip install -r requirements.txt" (windows) _someone with windows confirm pls_
3. Run "flask shell"
4. Now within flask shell:
 - Within flask shell, run "db.create_all()"
5. Return to main directory (cd ..)
6. docker-compose up build

# To view the database:
1. Install "SQLite Viewer"
2. Go to /backend/instance/db.sqlite3
