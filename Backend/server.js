const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For password hashing

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = 'mongodb+srv://bryanmobphone:adminpass123@budgetapp.uk6oe.mongodb.net/?retryWrites=true&w=majority&appName=BudgetApp';

// URL encode the password if it contains special characters
const encodedPassword = encodeURIComponent('adminpass123'); // Replace with your actual password
const mongoURISafe = `mongodb+srv://bryanmobphone:${encodedPassword}@budgetapp.uk6oe.mongodb.net/BudgetApp?retryWrites=true&w=majority`;

mongoose.connect(mongoURISafe, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Registration Route
app.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword, // Save the hashed password
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
