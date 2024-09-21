const User = require('../model/user');
const bcrypt = require('bcrypt');

// Register new user
exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status : "error", message : 'Email already exists'});
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await User.create({ fullName, email, password:hashedPassword});
    res.status(201).json({status : "success", newUser});
  } catch (error) {
    res.status(500).json({ message: error.message, status : 'error' });
  }
};