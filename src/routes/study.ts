import { Request, Response } from 'express';
var express = require('express');
const { StudyModel } = require('../models/study.model');
const { ReviewModel } = require('../models/review.model');
import { addDays, addWeeks, addMonths, format } from 'date-fns';

const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

const studyModel = new StudyModel();
const reviewModel = new ReviewModel();

router.post('/', verifyToken, async function (req: Request, res: Response) {
  const { topic, qnt_reviews, study_date, user_id } = req.body;

  try {
    if (!topic || !qnt_reviews || !study_date) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes" });
    }

    if (!user_id) {
      return res.status(400).json({ message: "Usuário indefinido" });
    }

    const parsedDate = new Date(study_date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Formato de data inválido. Use 'yyyy-mm-dd'." });
    }
    const fixedDate = addDays(parsedDate, 1);

    const formattedDate = format(fixedDate, 'yyyy-MM-dd');
    const study = await studyModel.createStudy(topic, qnt_reviews, formattedDate, user_id);

    let reviews = [];
    for (let i = 0; i < qnt_reviews; i++) {
      let reviewDate;
      if (i === 0) {
        reviewDate = addDays(fixedDate, 1);
      } else if (i === 1) {
        reviewDate = addWeeks(fixedDate, 1);
      } else {
        reviewDate = addMonths(fixedDate, i - 1);
      }

      const formattedReviewDate = format(reviewDate, 'yyyy-MM-dd');
      reviews.push(await reviewModel.createReview(topic, 'todo', formattedReviewDate, study.id));
    }

    res.status(201).json({ study, reviews });
  } catch (error) {
    console.error('Erro ao criar estudo', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
