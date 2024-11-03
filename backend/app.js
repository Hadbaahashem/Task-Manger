




const express = require('express');
const app = express();
require("dotenv").config();  

const conn = require("./conn/conn"); 
const cors =require("cors");

const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");
app.use(cors());

app.use(express.json())
const PORT = 5000;


conn();
  

app .use("/api/v1",UserAPI);
app .use("/api/v2",TaskAPI);
// localhost:5000/api/v1/sign-in
app.use('/', (req, res) => {
  res.send('hello from backend side');
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});