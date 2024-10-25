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
  // Bank Schema
  const bankSchema = new mongoose.Schema({
    name: { type: String, required: true },
    accountNumber: { type: String, required: true },
    type: { type: String, required: true },
    interestRate: { type: String, required: true },
    rewards: { type: String, required: false },
    balance: { type: Number, default: 0 }, // Add balance field
  });

  const insuranceSchema = new mongoose.Schema({
    provider: { type: String, required: true },
    PolicyName: { type: String, required: true },
    coverageType: { type: String, required: true }, // Add coverageType
    premium: { type: Number, required: true }, // Change premiumAmount to premium
    interestRate: { type: Number, required: false }, // Optional field
    potentialBenefits: { type: String, required: false }, // Optional field
});
const InvestmentSchema = new mongoose.Schema({
  investmentAmount: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  predictedValues: {
    type: [Number],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



  const Investment = mongoose.model('Investment', InvestmentSchema);
  const Bank = mongoose.model('Bank', bankSchema);
  const User = mongoose.model('User', userSchema);
  const Insurance = mongoose.model('Insurance', insuranceSchema);
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


  // Get All Banks
  app.get('/banks', async (req, res) => {
    try {
      const banks = await Bank.find(); // Retrieve all banks
      res.status(200).json(banks); // Send banks in the response
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving banks' }); // Handle error
    }
  });


  // Create Banks
  app.post('/banks', async (req, res) => {
    const { name, accountNumber, type, interestRate, rewards, balance } = req.body; // Include balance
    const newBank = new Bank({ name, accountNumber, type, interestRate, rewards, balance }); // Add balance

    try {
      await newBank.save();
      res.status(201).json(newBank);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update Bank
  app.put('/banks/:id', async (req, res) => {
    const { id } = req.params;
    const { name, accountNumber, type, interestRate, rewards, balance } = req.body; // Include balance

    try {
      const updatedBank = await Bank.findByIdAndUpdate(id, {
        name,
        accountNumber,
        type,
        interestRate,
        rewards,
        balance, // Update balance
      }, { new: true });

      if (!updatedBank) {
        return res.status(404).json({ error: 'Bank not found' });
      }
      
      res.status(200).json(updatedBank);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete Bank
  app.delete('/banks/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const deletedBank = await Bank.findByIdAndDelete(id);
      if (!deletedBank) {
        return res.status(404).json({ error: 'Bank not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/logout', (req, res) => {
    // Since you're not using sessions or tokens, just inform the client to clear local data.
    
    // Respond with success message
    res.status(200).json({ message: 'Logout successful' });
  });

// Create Insurance
app.post('/insurances', async (req, res) => {
  const {  provider, PolicyName, coverageType, premium, interestRate, potentialBenefits } = req.body;

  // Check if all required fields are provided
  if (!provider  || !PolicyName || !coverageType || !premium) {
      return res.status(400).json({ error: 'Policy Name, Provider, Coverage Type, and Premium are required.' });
  }

  try {
      const newInsurance = new Insurance({
          provider,
          PolicyName,
          coverageType,
          premium,
          interestRate, // Optional field
          potentialBenefits, // Optional field
      });

      const savedInsurance = await newInsurance.save();
      res.status(201).json(savedInsurance);
  } catch (error) {
      console.error('Error creating insurance:', error);
      res.status(400).json({ error: error.message });
  }
});


// Update Insurance
app.put('/insurances/:id', async (req, res) => {
  const { id } = req.params;
  const {  provider, PolicyName, coverageType, premium, interestRate, potentialBenefits } = req.body;

  // You can choose to enforce the same validation rules as above.
  if (!provider || !PolicyName || !coverageType || !premium) {
      return res.status(400).json({ error: 'Policy Name, Provider, Coverage Type, and Premium are required.' });
  }

  try {
      const updatedInsurance = await Insurance.findByIdAndUpdate(
          id,
          { provider,PolicyName,  coverageType, premium, interestRate, potentialBenefits },
          { new: true } // Return the updated document
      );

      if (!updatedInsurance) {
          return res.status(404).json({ error: 'Insurance not found.' });
      }

      res.json(updatedInsurance);
  } catch (error) {
      console.error('Error updating insurance:', error);
      res.status(400).json({ error: error.message });
  }
});


  // Delete Insurance
  app.delete('/insurances/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const deletedInsurance = await Insurance.findByIdAndDelete(id);
      if (!deletedInsurance) {
        return res.status(404).json({ error: 'Insurance not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.get('/insurances', async (req, res) => {
    try {
      const insurances = await Insurance.find(); // Fetch all insurances from the database
      res.status(200).json(insurances);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch insurance data' });
    }
  });

  app.post('/investments', async (req, res) => {
    console.log(req.body); // Log incoming data

    const { investmentAmount, interestRate, duration } = req.body;

    // Validate input
    if (!investmentAmount || !interestRate || !duration) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const investment = new Investment({
            investmentAmount,
            interestRate,
            duration,
        });

        await investment.save();
        res.status(201).json(investment);
    } catch (error) {
        console.error('Error saving investment:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});


app.get('/investments', async (req, res) => {
  try {
    const investment = await Investment.find(); // Fetch all insurances from the database
    res.status(200).json(investment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch insurance data' });
  }
});
