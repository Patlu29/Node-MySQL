const mysql = require("mysql2");
const express = require("express");
const http = require("http");
const { message } = require("prompt");
const { error } = require("console");

const app = express();
app.use(express.json());

app.listen(2900, () => {
  console.log("server run on localhost:2900");
});

const Connection = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "patlu8110",
  database: "prakash",
  connectionLimit: 15,
});

Connection.getConnection((e) => {
  if (e) {
    console.error("Error while connnecting with database: ", e);
    return;
  }
  console.log("Connected with databasae");
    // var newTable = `
    // CREATE TABLE IF NOT EXISTS Student_attendance
    // (Id INT AUTO_INCREMENT PRIMARY KEY,
    // Register_number INT UNIQUE NOT NULL,
    // Name VARCHAR(100) NOT NULL,
    // Class VARCHAR(100) NOT NULL,
    // Attendance_percentage FLOAT(6) NOT NULL);
    //   `;
    // Connection.query(newTable, (e) => {
    //   if (e) {
    //     console.error("Error while creating table: ", e);
    //     return;
    //   }
    //   console.log("Table created");
    // });
});

app.get("/students", async (req, res) => {
  try {
    const data = await Connection.promise().query(
      "SELECT * FROM Student_attendance;"
    );
    res.status(200).json({
      message: data[0],
    });
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
});

app.post("/students", async (req, res) => {
  try {
    const { Register_number, Name, Class, Attendance_percentage } = req.body;
    const RegNo = req.body.Register_number;
    const RegNoData = `SELECT COUNT(*) AS count FROM Student_attendance WHERE Register_number = ?`;

    Connection.query(RegNoData, [RegNo], (error, results) => {
      const count = results[0].count;
      let RegNoCount = count === 1;
      if (RegNoCount) {
        res.status(400).json({
          message: "already exist",
        });
      }
    });
    const [{ Id }] = await Connection.promise().query(
      `INSERT INTO Student_attendance (Register_number, Name, Class, Attendance_percentage) VALUES (?, ?, ?, ?)`,
      [Register_number, Name, Class, Attendance_percentage]
    );

    res.status(202).json({
      message: "Student added",
    });
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
});

app.put("/students/:Id", async (req, res) => {
  try {
    const { id } = req.params
    const { Register_number,Name, Class, Attendance_percentage } = req.body
    const update = await Connection.promise().query(
      `UPDATE Student_attendance set Register_number = ?, Name = ?, Class = ?, Attendance_percentage = ?`, [Register_number, Name, Class, Attendance_percentage]
    )
    res.status(200).json({
      message: "student data updated"
    })
  }catch(e) {
    res.status(500).json({
      message: e
    })
  }
})

app.delete("/students/:Id", async (req, res) => {
  try {
    const { Id } = req.params
    const update = await Connection.promise().query(
      `DELETE FROM Student_attendance WHERE  Id = ?`, [Id]
    )
    res.status(200).json({
      message: "Student data deleted"
    })
  }catch(e) {
    res.status(500).json({
      message: e
    })
  }
})
