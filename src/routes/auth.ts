var express = require('express');
var router = express.Router();
const { UserModel } = require('../models/user.model');
const userModel = new UserModel();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/authMiddleware');
require('dotenv').config();

router.get('/verify-token', verifyToken, (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  res.status(200).json({ message: 'Token is valid' });
});

router.post('/register', async (req: { body: { email: any; password: any; teacherid: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): void; new(): any; }; }; }) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);
    if (user) {
      return res
        .status(403)
        .json({ error: 'User with that email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
