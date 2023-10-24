import sqlite3

conn = sqlite3.connect('database.db')

conn.execute("INSERT INTO students (name, addr, city, zip) VALUES ('John Doe', '123 Elm St', 'Springfield', '12345')")
conn.execute("INSERT INTO students (name, addr, city, zip) VALUES ('Jane Smith', '456 Oak St', 'Springfield', '12345')")
print("Inserted records successfully!")