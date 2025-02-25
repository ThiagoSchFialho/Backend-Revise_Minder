import { Request, Response } from 'express';
var express = require('express');
const { StudyModel } = require('../models/study.model');
const { ReviewModel } = require('../models/review.model');
import { addDays, addWeeks, addMonths, format } from 'date-fns';

const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

const studyModel = new StudyModel();
const reviewModel = new ReviewModel();

router.get('/', verifyToken, async function (req: Request, res: Response) {
  const { user_id } = req.query;

  try {
    if (!user_id) {
      return res.status(400).json({ error: 'Usuário indefinido' })
    }

    const studies = await studyModel.getStudies(user_id);
    return res.status(200).json(studies);
  } catch (error) {
    console.error('Erro ao recuperar estudos', error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

router.get('/:id', verifyToken, async function (req: Request, res: Response) {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: 'estudo indefinido' })
    }

    const study = await studyModel.getStudy(id);
    return res.status(200).json(study);
  } catch (error) {
    console.error('Erro ao recuperar estudo', error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/:id', verifyToken, async function (req: Request, res: Response) {
  const { id } = req.params;
  const { topic, qnt_reviews, study_date, user_id } = req.body;

  try {
    if (!topic || !qnt_reviews || !study_date) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    if (!user_id) {
      return res.status(400).json({ error: "Usuário indefinido" });
    }

    const parsedDate = new Date(study_date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Formato de data inválido. Use 'yyyy-mm-dd'." });
    }
    const fixedDate = addDays(parsedDate, 1);
    const formattedDate = format(fixedDate, 'yyyy-MM-dd');

    const study = await studyModel.updateStudy(id, topic, qnt_reviews, formattedDate, user_id);

    if (!study) {
      return res.status(404).json({ error: "Estudo não encontrado" });
   }

    let existingReviews = await reviewModel.getReviewsFromStudy(id);
    existingReviews.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let updatedReviews = [];

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

      if (i < existingReviews.length) {
        const updatedReview = await reviewModel.updateReview(existingReviews[i].id, topic, formattedReviewDate);
        updatedReviews.push(updatedReview);

      } else {
        const newReview = await reviewModel.createReview(topic, 'todo', formattedReviewDate, study.id);
        updatedReviews.push(newReview);
      }
    }

    if (existingReviews.length > qnt_reviews) {
      const reviewsToDelete = existingReviews.slice(qnt_reviews);
      for (const review of reviewsToDelete) {
        await reviewModel.deleteReview(review.id);
      }
    }

    res.status(200).json({ study, updatedReviews });

  } catch (error) {
    console.error('Erro ao editar estudo', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/', verifyToken, async function (req: Request, res: Response) {
  const { topic, qnt_reviews, study_date, user_id } = req.body;

  try {
    if (!topic || !qnt_reviews || !study_date) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    if (!user_id) {
      return res.status(400).json({ error: "Usuário indefinido" });
    }

    const parsedDate = new Date(study_date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Formato de data inválido. Use 'yyyy-mm-dd'." });
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
      reviews.push(await reviewModel.createReview(topic, 'todo', formattedReviewDate, study.id, user_id));
    }

    res.status(201).json({ study, reviews });
  } catch (error) {
    console.error('Erro ao criar estudo', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
