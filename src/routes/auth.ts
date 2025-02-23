var express = require('express');
var router = express.Router();
const { UserModel } = require('../models/user.model');
const userModel = new UserModel();
const verifyToken = require('../middlewares/authMiddleware');
require('dotenv').config();

router.get('/verify-token', verifyToken, (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  res.status(200).json({ message: 'Token is valid' });
});

router.get('/', function(req: any, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

module.exports = router;
