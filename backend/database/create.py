import sqlite3

conn = sqlite3.connect('database.db')
print("Connected to database successfully")

conn.execute('CREATE TABLE professionals (id INTEGER PRIMARY KEY)')
conn.execute('CREATE TABLE companies (id INTEGER PRIMARY KEY)')
conn.execute('CREATE TABLE projects (id INTEGER PRIMARY KEY)')

print("Created table successfully!")

conn.close()
