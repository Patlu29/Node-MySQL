const mysql = require("mysql2");

const Connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "patlu8110",
  database: "prakash",
});

Connection.connect((error) => {
  if (error) {
    console.error("Error connecting with database: ", error);
    return;
  }
  console.log("connection successful..");

  Connection.query("SELECT * FROM student_details", (error, results) => {
    if (error) {
      console.error("Error while executing query: ", error);
      return;
    }
    console.log("Query results: ", results);
  });

  Connection.query(
    "INSERT INTO student_details(Student_id, Name, Class) VALUES ('127', 'KAVI', 'CS-I')",
    (error, result) => {
      if (error) {
        console.error("Error while inserting data: ", error);
        return;
      }
      console.log("Data inserted: ", result);
    }
  );
});
