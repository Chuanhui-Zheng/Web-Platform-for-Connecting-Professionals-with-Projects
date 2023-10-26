#!/bin/bash
export FLASK_SQLALCHEMY_DATABASE_URI='sqlite:///db.sqlite3'

if [ "$1" == "clear" ]; then
    python3 db_clear.py
elif [ "$1" == "init" ]; then
    python3 db_init.py
else
    echo "Usage: $0 {clear|init}"
    exit 1
fi