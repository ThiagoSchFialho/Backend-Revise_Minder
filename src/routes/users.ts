import { Request, Response } from 'express';
var express = require('express');
const { UserModel} = require('../models/user.model');

var router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const userModel = new UserModel();

router.get('/email', verifyToken, async function(req: Request, res: Response, next: any) {
  const { user_id } = req.query;

  try {
    if (!user_id) {
      return res.status(400).json({ error: 'Usuário indefinido' });
    }

    const email = await userModel.getEmailByUser(user_id);
    return res.status(200).json(email);
  } catch (error) {
    console.error('Erro ao recuperar email', error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/email', verifyToken, async function(req: Request, res: Response, next: any) {
  const { user_id, email } = req.body;

  console.log(user_id)
  console.log(email)

  try {
    if (!email) {
      return res.status(400).json({ error: 'Email indefinido' });
    }

    if (!user_id) {
      return res.status(400).json({ error: 'Usuário indefinido' });
    }

    const user = await userModel.getUserByEmail(email);

    if (user) {
      return res.status(400).json({ error: 'Email indisponivel' });
    }

    const user2 = await userModel.updateUserEmail(user_id, email);
    return res.status(200).json(user2);
  } catch (error) {
    console.error('Erro ao atualizar email', error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

module.exports = router;
