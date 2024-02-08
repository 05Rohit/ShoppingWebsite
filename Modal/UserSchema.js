var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  console.log("hi from password hashing");

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12); 
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
  }


 

  next();
});

const user = mongoose.model("usersData", userSchema);

module.exports = user;
