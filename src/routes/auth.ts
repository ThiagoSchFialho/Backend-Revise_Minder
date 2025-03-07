import { Request, Response } from 'express';
var express = require('express');
var router = express.Router();
const { UserModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/authMiddleware');
const nodemailer = require('nodemailer');
require('dotenv').config();

const userModel = new UserModel();

router.get('/verify-token', verifyToken, (req: Request, res: Response ) => {
  res.status(200).json({ message: 'Token is valid' });
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateToken = () => {
  return require('crypto').randomBytes(32).toString('hex');
};


router.post('/register', async (req: Request, res: Response) => {
  const { email, password, terms } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);
    if (user) {
      return res
        .status(403)
        .json({ error: 'User with that email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateToken();

    await userModel.createUser(email, hashedPassword, terms, verificationToken);

    const textStyles = "color: black; font-size: 16pt; text-align: center; margin-bottom: 25px;";

    const buttonContainerStyles = "text-align: center;"

    const buttonStyles = `
      background-color: #1A97F0;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      font-size: 12pt;
      font-weight: 600;
      text-align: center;
      display: inline-block;
      text-decoration: none;
      color: white;
    `;

    const verificationLink = `https://reviseminder.com/api/auth/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verifique seu email',
      html: `
        <p style="${textStyles}">
          Por favor, clique no link para verificar seu email:
        </p>
        <div style="${buttonContainerStyles}">
          <a href="${verificationLink}" style="${buttonStyles}">Verificar Email</a>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/verify-email', async (req: Request, res: Response) => {
  const { token } = req.query;

  try {
    const user = await userModel.getUserByVerificationToken(token);
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    await userModel.verifyUserEmail(user.id);
    res.render('verify-email');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    if (!user.is_verified) {
      return res.status(401).json({ error: 'User not verified' });
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '10h'
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'Usuário indefinido' });
    }

    const resetToken = generateToken();
    const resetTokenExpires = Date.now() + 3600000;

    await userModel.saveResetToken(user.id, resetToken, resetTokenExpires);

    const textStyles = "color: black; font-size: 16pt; text-align: center; margin-bottom: 25px;";

    const buttonContainerStyles = "text-align: center;"

    const buttonStyles = `
      background-color: #1A97F0;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      font-size: 12pt;
      font-weight: 600;
      text-align: center;
      display: inline-block;
      text-decoration: none;
      color: white;
    `;

    const resetLink = `https://reviseminder.com/resetPassword?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperação de Senha',
      html: `
        <p style="${textStyles}">
          Clique no link para redefinir sua senha:
        </p>
        <div style="${buttonContainerStyles}">
          <a href="${resetLink}" style="${buttonStyles}">Redefinir senha</a>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send reset email' });
  }
});

router.post('/reset-password', async (req: Request, res: Response) => {
  const { newPassword, token } = req.body;

  try {
    const user = await userModel.getUserByResetToken(token);
    if (!user || user.reset_password_expires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userModel.updateUserPassword(user.id, hashedPassword);

    await userModel.clearResetToken(user.id);
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Password reset failed' });
  }
});

module.exports = router;
