const express = require("express");
const cors = require("cors");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")

require("../Database/db");
const user = require("../Modal/UserSchema");


/* Reguistraion Route */

router.post("/register", async (req, res) => {
  console.log(req.body);

  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(422).json({ error: "Fill the All Data" });
  }

  try {
    const userExists = await user.findOne({ email: email });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    } else if (password != confirmPassword) {
      return res
        .status(422)
        .json({ error: "Password dont matched with confirm password" });
    } else {
      const userData = new user({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      await userData.save();

      res.status(201).json("uploaded");
    }
  } catch (error) {
    console.log(error);
  }
});

/*  SIGNIN ke liye */

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Fill the data" });
    }

    const userLogin = await user.findOne({ email: email });

    if (userLogin) {
      const ispasswordMatch = await bcrypt.compare(
        password,
        userLogin.password
      );

      if (!ispasswordMatch) {
        return res.status(400).json({ error: "Invalid Credential from backend" });
      } 
      else {
      
        const payload = {
          userId: userLogin._id, 
          email: userLogin.email 
        };
        const secretKey = process.env.SECRET_KEY; // This should ideally be stored in an environment variable
        const options = {
          expiresIn: '1day' 
        };

        token = jwt.sign(payload, secretKey, options);

        userLogin.tokens.push({ token });
        await userLogin.save();
        res.json({ tokens: token, userLogin: userLogin });

        console.log(userLogin)
       
      }
    }


    else{
        res.status(400).json({ error: "Invalid Credientials from backend server,try again" });
    }
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
