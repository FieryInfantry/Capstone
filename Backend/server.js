const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For password hashing
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // For generating verification code

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
  resetPasswordToken: { type: String }, // Token for resetting password
  resetPasswordExpires: { type: Date }  // Token expiry time
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: 'bgpad3741@gmail.com', // Replace with your email
    pass: 'pzjw comd vfmn hwbw'         
  }
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


// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Login success
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Forgot Password Route
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(4).toString('hex');

    // Set token and expiry on the user record
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration

    await user.save();

    // Send email with the token
    const mailOptions = {
      from: 'bgpad3741@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested to reset your account password.\n\n` +
            `Please use the following code to reset your password:\n\n` +
            `${resetToken}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ error: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset email sent' });
    });

  } catch (error) {
    console.error('Error during forgot password:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reset Password Route
app.post('/reset-password', async (req, res) => {
  const { email, resetToken, newPassword } = req.body;

  try {
    // Find the user by email and reset token, and ensure the token hasn't expired
    const user = await User.findOne({
      email,
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and clear the reset token and expiry
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
