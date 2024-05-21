const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config()
const JWT_SECRET = process.env.Secret_key
router.post(
  "/loginuser",
  [
    body("email", "Incorrect email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    let email = req.body.email;
    try {
      const userData = await User.findOne({email});
      if (!userData) {
        return res.status(400).json({ error: "Invaild Credentials" });
      }
      const passwordCompare=await bcrypt.compare(req.body.password,userData.password)
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invaild Credentials" });
      }
      const data={
        user:{
          id:userData.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      return res.json({ success: true,authtoken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
