const router = require("express").Router();
const { Router } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
// Sign-in API
router.post("/sign-in", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (username.length < 4) {
      return res.status(400).json({ message: "Username should have at least 4 characters" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with the hashed password
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ message: "Sign-in successfully" });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//  LOGIN 


router.get("/log-in", async(req , res)=>{
    const {username , password}= req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
        return res.status(400).json({ message: "Username or password is incorrect " });
      }
    bcrypt.compare(password , existingUser.password,(err, data)=>{
    if ( data){
        const authClaims= [{name:username},{jti:jwt.sign({}, "tcmTM")}]
      const token = jwt.sign({authClaims},"tcmTM" , { expiresIn: "2d"});
    res.status(200).json({id:existingUser._id , token});
    }else {
        return res.status(400).json({ message: "invaild credentials " });


    }
      

    })





})
module.exports = router;

 