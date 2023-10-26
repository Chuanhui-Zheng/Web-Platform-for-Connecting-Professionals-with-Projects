#!/bin/bash
export FLASK_SQLALCHEMY_DATABASE_URI='sqlite:///dbtest.sqlite3'

if [ "$1" == "clear" ]; then
    python3 db_clear.py
elif [ "$1" == "init" ]; then
    python3 db_init.py
elif [ "$1" == "test" ]; then
    python3 db_clear.py
    python3 db_test.py
    python3 db_clear.py
else
    echo "Usage: $0 {clear|init}"
    exit 1
fi