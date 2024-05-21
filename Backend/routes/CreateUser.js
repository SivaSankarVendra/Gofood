const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config()
const JWT_SECRET = process.env.Secret_key
router.post(
  "/createuser",
  [
    body("email","Incorrect email").isEmail(),
    body("name","Incorrect name").isLength({ min: 5 }),
    body("password","Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
      return res.status(400).json({error:error.array()})
    }
    let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success:false, error: "a user with email already exits" })
        }
    const salt=await bcrypt.genSalt(10)
    const secPassword=await bcrypt.hash(req.body.password,salt)
    try {
      user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.location,
      });
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true,authtoken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
