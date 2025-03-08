const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const studentrouter=require("./app/routes/stud.routes");
const facultyrouter=require("./app/routes/faculty.routes");
const projectrouter=require("./app/routes/coordinator.routes");
const allocrouter=require("./app/routes/alloc.routes");

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());//middleware 

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to VIERP." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(studentrouter);
app.use(facultyrouter);
app.use(projectrouter);
app.use(allocrouter);
