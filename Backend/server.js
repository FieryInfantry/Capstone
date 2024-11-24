require('dotenv').config();
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const bcrypt = require('bcrypt'); // For password hashing
  const nodemailer = require('nodemailer');
  const crypto = require('crypto'); // For generating verification code
  const jwt = require('jsonwebtoken');

  const { JWT_SECRET_KEY } = process.env;

  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());

  // Connect to MongoDB
  const mongoURI = 'mongodb+srv://bryanmobphone:adminpass123@budgetapp.uk6oe.mongodb.net/?retryWrites=true&w=majority&appName=BudgetApp';

  // URL encode the password if it contains special characters
  const encodedPassword = encodeURIComponent('adminpass123'); // Replace with your actual password
  const mongoURISafe = `mongodb+srv://bryanmobphone:${encodedPassword}@budgetapp.uk6oe.mongodb.net/BudgetApp?retryWrites=true&w=majority`;

  const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      req.userId = decoded.userId; // Attach user ID to the request
      next();
    } catch (error) {
      res.status(403).json({ error: "Invalid token" });
    }
  };

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
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    accountNumber: { type: String, required: true },
    type: { type: String, required: true },
    interestRate: { type: String, required: true },
    rewards: { type: String, required: false },
    balance: { type: Number, default: 0 }
  });

  const insuranceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    provider: { type: String, required: true },
    policyName: { type: String, required: true },
    coverageType: { type: String, required: true },
    premium: { type: Number, required: true },
    interestRate: { type: Number, required: false },
    potentialBenefits: { type: String, required: false }
  });


const InvestmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  investmentAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  duration: { type: Number, required: true },
  predictedValues: { type: [Number], default: [] },
  createdAt: { type: Date, default: Date.now }
});

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Relates the budget to a specific user
});
const expenseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  bank: { type: String, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
const incomeSchema = new mongoose.Schema({
  category: { type: String, required: true },  // Category for the income
  amount: { type: Number, required: true  },  // Amount of income
  date: { type: Date, default: Date.now },  // Date of income
  bank: { type: String, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Relates the income to a specific user
});

  const Income = mongoose.model('Income', incomeSchema);
  const Expense = mongoose.model('Expense', expenseSchema);
  const Budget = mongoose.model('Budget', budgetSchema);
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });

    // Send full name and token in the response
    res.status(200).json({ message: 'Login successful', token, user: { fullName: user.fullName, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


  // Protected Route Example
app.get('/profile', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
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

  //Chage password
  app.post('/change-password', authenticateUser, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
  
      // Hash and update the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  


  // Get All Banks
  app.get('/banks', authenticateUser, async (req, res) => {
    try {
      const banks = await Bank.find({ userId: req.userId });
      res.status(200).json(banks);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving banks' });
    }
  });


  // Create Banks
  app.post('/banks', authenticateUser, async (req, res) => {
    const { name, accountNumber, type, interestRate, rewards, balance } = req.body;
    const newBank = new Bank({ userId: req.userId, name, accountNumber, type, interestRate, rewards, balance });
  
    try {
      await newBank.save();
      res.status(201).json(newBank);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
// Get all bank account balances
app.get('/banks/balances', authenticateUser, async (req, res) => {
  try {
    const banks = await Bank.find({ userId: req.userId });
    const totalBalance = banks.reduce((sum, bank) => sum + (bank.balance || 0), 0);
    res.status(200).json({ totalBalance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


  // Update Bank
  app.put('/banks/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { name, accountNumber, type, interestRate, rewards, balance } = req.body;
  
    try {
      const updatedBank = await Bank.findOneAndUpdate(
        { _id: id, userId: req.userId },
        { name, accountNumber, type, interestRate, rewards, balance },
        { new: true }
      );
  
      if (!updatedBank) return res.status(404).json({ error: 'Bank not found or not authorized' });
      res.status(200).json(updatedBank);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete Bank
  app.delete('/banks/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedBank = await Bank.findOneAndDelete({ _id: id, userId: req.userId });
      if (!deletedBank) return res.status(404).json({ error: 'Bank not found or not authorized' });
  
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
  })

// Create Insurance
app.post('/insurances', authenticateUser, async (req, res) => {
  const { provider, policyName, coverageType, premium, interestRate, potentialBenefits } = req.body;

  if (!provider || !policyName || !coverageType || !premium) {
    return res.status(400).json({ error: 'Provider, Policy Name, Coverage Type, and Premium are required.' });
  }

  try {
    const newInsurance = new Insurance({
      userId: req.userId,
      provider,
      policyName,
      coverageType,
      premium,
      interestRate,
      potentialBenefits
    });

    const savedInsurance = await newInsurance.save();
    res.status(201).json(savedInsurance);
  } catch (error) {
    console.error('Error creating insurance:', error);
    res.status(400).json({ error: error.message });
  }
});



// Update Insurance
app.put('/insurances/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { provider, policyName, coverageType, premium, interestRate, potentialBenefits } = req.body;

  if (!provider || !policyName || !coverageType || !premium) {
    return res.status(400).json({ error: 'Provider, Policy Name, Coverage Type, and Premium are required.' });
  }

  try {
    const updatedInsurance = await Insurance.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { provider, policyName, coverageType, premium, interestRate, potentialBenefits },
      { new: true }
    );

    if (!updatedInsurance) {
      return res.status(404).json({ error: 'Insurance not found or not authorized' });
    }

    res.json(updatedInsurance);
  } catch (error) {
    console.error('Error updating insurance:', error);
    res.status(400).json({ error: error.message });
  }
});

  // Delete Insurance
  app.delete('/insurances/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedInsurance = await Insurance.findOneAndDelete({ _id: id, userId: req.userId });
      if (!deletedInsurance) {
        return res.status(404).json({ error: 'Insurance not found or not authorized' });
      }
  
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


  //Get All Insurance

app.get('/insurances', authenticateUser, async (req, res) => {
  try {
    const insurances = await Insurance.find({ userId: req.userId });
    res.status(200).json(insurances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch insurance data' });
  }
});


//Create Investments
app.post('/investments', authenticateUser, async (req, res) => {
  const { investmentAmount, interestRate, duration } = req.body;

  if (!investmentAmount || !interestRate || !duration) {
    return res.status(400).json({ message: 'Investment Amount, Interest Rate, and Duration are required.' });
  }

  try {
    const investment = new Investment({
      userId: req.userId,
      investmentAmount,
      interestRate,
      duration
    });

    await investment.save();
    res.status(201).json(investment);
  } catch (error) {
    console.error('Error saving investment:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


app.get('/investments', authenticateUser, async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.userId });
    res.status(200).json(investments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch investment data' });
  }
});


app.post('/budget', authenticateUser, async (req, res) => {
  const { category, amount, month, year } = req.body;
  const userId = req.userId;  // Assuming user ID is attached to the request

  // Validate input fields
  if (!category || !amount || !month || !year) {
    return res.status(400).json({ error: 'All fields (category, amount, month, year) are required.' });
  }

  try {

    const newBudget = new Budget({
      userId,
      category,
      amount,
      month,
      year,
    });

    await newBudget.save();

    // Respond with the newly saved budget
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the budget.' });
  }
});

app.get('/budget/monthly', authenticateUser, async (req, res) => {
  const { month, year } = req.query;
  const userId = req.userId; // Assuming user ID is attached to the request

  // Validate input fields
  if (!month || !year) {
    return res.status(400).json({ error: 'Month and year are required.' });
  }

  try {
    // Query the database for budgets that match the given month, year, and userId
    const budgets = await Budget.find({ userId, month, year });

    // Respond with the fetched budgets
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the budgets.' });
  }
});


app.delete('/budget', authenticateUser, async (req, res) => {
  const { category, month, year } = req.query;  // Read from query params

  if (!category || !month || !year) {
    return res.status(400).json({ error: 'Missing required parameters: category, month, year' });
  }

  try {
    // Find and delete the budget for the given category, month, and year
    const budget = await Budget.findOneAndDelete({ category, month: parseInt(month), year: parseInt(year) });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the budget' });
  }
});

app.get('/budget/total', authenticateUser, async (req, res) => {
  try {
    // Calculate the total sum of all budgets
    const total = await Budget.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.json({ total: total[0]?.total || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch total budget' });
  }
});

app.get('/budgets', authenticateUser, async (req, res) => {
  try {
    // Find all budgets for the authenticated user
    const budgets = await Budget.find({ userId: req.userId }).populate('category');
    
    // Respond with the budgets
    res.status(200).json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ error: 'Error retrieving budgets' });
  }
});

app.post('/expense', authenticateUser, async (req, res) => {
  console.log('Received expense data:', req.body);

  const { category, amount, date, account } = req.body;  // Change `bank` to `account`
  const userId = req.userId;

  if (!category || !amount || !account) {  // Change `bank` to `account`
    return res.status(400).json({ error: 'Category, amount, and account are required.' });
  }

  try {
    const newExpense = new Expense({
      category,
      amount: parseFloat(amount),
      date: date || Date.now(),
      bank: account || null,  // Use `account` instead of `bank`
      userId,
    });

    await newExpense.save();

    const selectedBank = await Bank.findOne({ name: account, userId: req.userId });  // Adjusted to find the bank by name

    if (!selectedBank) {
      return res.status(404).json({ error: 'Bank not found.' });
    }

    selectedBank.balance -= parseFloat(amount);
    await selectedBank.save();

    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error saving expense or updating bank balance:', error);
    res.status(500).json({ error: 'An error occurred while saving the expense or updating the bank balance.' });
  }
});




app.get('/expenses/monthly', authenticateUser, async (req, res) => {
  const { month, year } = req.query;
  const userId = req.userId; // Assuming user ID is attached to the request

  // Validate input fields
  if (!month || !year) {
    return res.status(400).json({ error: 'Month and year are required.' });
  }

  // Parse month and year to integers
  const parsedMonth = parseInt(month);
  const parsedYear = parseInt(year);

  // Create date range: First day of the month to the last day of the month
  const startDate = new Date(parsedYear, parsedMonth - 1, 1); // First day of the month
  const endDate = new Date(parsedYear, parsedMonth, 0); // Last day of the month

  try {
    // Query the database for expenses that fall within the month and year
    const expenses = await Expense.find({
      userId,
      date: { $gte: startDate, $lt: endDate },
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'An error occurred while fetching the expenses.' });
  }
});


app.post('/income', authenticateUser, async (req, res) => {
  const { category, amount, date, account } = req.body;  // Get 'account' instead of 'bank'
  const userId = req.userId;

  if (!category || !amount || !account) {
    return res.status(400).json({ error: 'Category, amount, and account are required.' });
  }

  try {
    // Try to find the selected bank using the 'account' name
    let bank = await Bank.findOne({ name: account, userId });

    if (!bank) {
      // If the bank does not exist, create a new bank record with hardcoded values
      bank = new Bank({
        userId,
        name: account,             // Bank name (from request)
        accountNumber: 'None',     // Hardcoded value
        type: 'Income',            // Hardcoded value
        interestRate: 'None',      // Hardcoded value
        rewards: '',               // Optional: Empty or set to default
        balance: parseFloat(amount), // Set the balance to the income amount
      });

      // Save the new bank record
      await bank.save();
    } else {
      // If the bank exists, check if it has a balance
      if (bank.balance === undefined || bank.balance === null) {
        // If no balance, initialize it with the income amount
        bank.balance = parseFloat(amount);
        await bank.save();
      } else {
        // Otherwise, add the income amount to the existing balance
        bank.balance += parseFloat(amount);
        await bank.save();
      }
    }

    // Create new income record
    const newIncome = new Income({
      category,
      amount: parseFloat(amount),
      date: date || Date.now(),
      bank: account,  // Store 'account' as 'bank'
      userId,
    });

    // Save the income record
    await newIncome.save();

    // Send the response with the new income and updated bank balance
    res.status(201).json({ newIncome, updatedBank: bank });
  } catch (error) {
    console.error('Saving Error:', error);
    res.status(500).json({ error: 'An error occurred while saving the income.' });
  }
});




app.get('/incomes/monthly', authenticateUser, async (req, res) => {
  const { month, year } = req.query;
  const userId = req.userId; // Assuming user ID is attached to the request

  // Validate input fields
  if (!month || !year) {
    return res.status(400).json({ error: 'Month and year are required.' });
  }

  // Parse month and year to integers
  const parsedMonth = parseInt(month);
  const parsedYear = parseInt(year);

  // Validate parsed values
  if (isNaN(parsedMonth) || isNaN(parsedYear) || parsedMonth < 1 || parsedMonth > 12) {
    return res.status(400).json({ error: 'Invalid month or year provided.' });
  }

  // Create date range: First day of the month to the last day of the month
  const startDate = new Date(parsedYear, parsedMonth - 1, 1); // First day of the month
  const endDate = new Date(parsedYear, parsedMonth, 0);

  try {
    // Query the database for incomes that fall within the month and year
    const incomes = await Income.find({
      userId,
      date: { $gte: startDate, $lt: endDate }, // Use $gte (>=) and $lt (<) for range
    });

    res.status(200).json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    res.status(500).json({ error: 'An error occurred while fetching the incomes.' });
  }
});


app.delete('/income/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;  // Read the ID from the URL parameter

  if (!id) {
    return res.status(400).json({ error: 'Missing required parameter: id' });
  }

  try {
    // Find and delete the income entry by ID
    const income = await Income.findByIdAndDelete(id);

    if (!income) {
      return res.status(404).json({ error: 'Income entry not found' });
    }

    res.status(200).json({ message: 'Income entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the income entry' });
  }
});

app.delete('/expense/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;  // Read the ID from the URL parameter

  if (!id) {
    return res.status(400).json({ error: 'Missing required parameter: id' });
  }

  try {
    // Find and delete the expense entry by ID
    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense entry not found' });
    }

    res.status(200).json({ message: 'Expense entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the expense entry' });
  }
});

app.put('/budgets/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { category, amount } = req.body;  // Only category and amount can be updated
  
  try {
    // Find the budget by id and userId (to ensure the user can only update their own budgets)
    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { category, amount },
      { new: true }  // This returns the updated document
    );
  
    // If no budget is found or the user is not authorized, send a 404 error
    if (!updatedBudget) {
      return res.status(404).json({ error: 'Budget not found or not authorized' });
    }
    
    // Return the updated budget in the response
    res.status(200).json(updatedBudget);
  } catch (error) {
    // Handle any errors that occur
    res.status(400).json({ error: error.message });
  }
});
