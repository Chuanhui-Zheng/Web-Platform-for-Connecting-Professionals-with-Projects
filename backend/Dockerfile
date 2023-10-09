# Use the official Python image
FROM python:3.11.4-slim-buster

# Set the working directory
WORKDIR /backend

# Copy requirements.txt
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update -y \
    && apt install python3 -y \
    && apt install python3-pip -y \
    && apt install python3-venv -y \
    && python3 -m venv venv
# Copy the rest of the Django project files
COPY . .

# Apply migrations
#RUN python manage.py migrate

# Expose the port that Django will run on
EXPOSE 8000

# Start the Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]