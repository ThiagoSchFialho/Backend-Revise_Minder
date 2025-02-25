import { Request, Response } from 'express';
var express = require('express');
const { ReviewModel } = require('../models/review.model');

const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

const reviewModel = new ReviewModel();

router.get('/', verifyToken, async function (req: Request, res: Response) {
  const { user_id } = req.query;

  try {
    if (!user_id) {
      return res.status(400).json({ error: 'Usuário indefinido' })
    }

    const studies = await reviewModel.getReviews(user_id);
    return res.status(200).json(studies);
  } catch (error) {
    console.error('Erro ao recuperar revisões', error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

module.exports = router;
