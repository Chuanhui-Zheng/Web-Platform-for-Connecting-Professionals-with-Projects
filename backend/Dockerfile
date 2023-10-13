FROM python:3.11.4-slim-buster

WORKDIR /backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update -y \
    && apt install python3 -y \
    && apt install python3-pip -y \
    && apt install python3-venv -y \
    && python3 -m venv venv

RUN source env/Scripts/activate

RUN pip install flask flask-CORS flask-jwt-extended python-dotenv sqlalchemy 

COPY . .

EXPOSE 5000

CMD ["flask", "run", "0.0.0.0:5000"]