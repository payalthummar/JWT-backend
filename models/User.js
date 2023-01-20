const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//create custome static signup method

userSchema.statics.signup = async function (email, password) {
  //validation

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  if (!email || !password) {
    throw Error("All Fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Make sure to use at least 8 characters, one uppercase letter, a Number and a Symbol"
    );
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

// create custom static login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
};
module.exports = mongoose.model("User", userSchema);
//collection: User, schemaname
