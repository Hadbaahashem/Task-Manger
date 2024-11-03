const router = require("express").Router();

const Task  = require("../models/task");
const User = require("../models/user");
const { authenticateToken } = require("./auth");
// create task   
router.post("/create-task",authenticateToken , async (req , res) => {

    try {
const { title ,desc}= req.body;
const  {id} = req.headers;


    if (!title || !desc || !id) {
      return res.status(400).json({ message: "Title, description, and user ID are required." });
    }
const newTask = new Task({title, desc});
const saveTask = await newTask.save();
const  taskId = saveTask._id;
await User.findByIdAndUpdate(id ,{$push:{tasks:taskId._id} });
res.status(200).json({message:"Task created", taskId:saveTask._id})








    
    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    



});

router.get("/get-all-tasks", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming `id` is part of your token payload
        const userData = await User.findById(userId).populate("tasks");
        res.status(200).json({ data: userData });
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = router;