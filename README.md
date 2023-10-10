# capstone-project-2024-t3-3900h13ajemma
capstone-project-2024-t3-3900h13ajemma created by GitHub Classroom

How to use docker
in the main directory,
docker-compose up --build 

Then, go to localhost:8080

and login using admin@admin.com, password is admin.

Go to add server, name is postgres server and then the host is postgres
Username is bigdog, password is pass

Re-run docker-compose up --build and it should work
Frontend: localhost:5173
Backend: localhost:8000
Database: localhost:8080

NOTES:

python -m venv env

env/Scripts/activate

pip install -r requirements.txt

npm install vite

!npm run dev in /frontend to run frontend

!python manage.py runserver in /backend to run backend

urls for frontend in frontend/src/App.jsx
- protected means you need an access token (be logged in)

pages contain page functionality
styles contain HTML/CSS (visual)

#to-do

/backend/api/serializers.py 
- change noteserializer to projectserializer

/backend/api/views.py 
- change views to project views

/backend/urls.py 
- update views changed

/backend/models.py 
- update models to projects
