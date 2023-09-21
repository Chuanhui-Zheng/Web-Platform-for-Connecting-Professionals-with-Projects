# capstone-project-2024-t3-3900h13ajemma
capstone-project-2024-t3-3900h13ajemma created by GitHub Classroom

NOTES:

python -m venv env
env/Scripts/activate
pip install -r requirements.txt


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