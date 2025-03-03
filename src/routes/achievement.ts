import { Request, Response } from 'express';
var express = require('express');
const { AchievementModel} = require('../models/achievement.model');

var router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const achievementModel = new AchievementModel();

router.post('/', verifyToken, async function(req: Request, res: Response, next: any) {
  const { name, reward, user_id } = req.body;
  
  try {
    if (!name) {
      return res.status(400).json({ error: 'Nome indefinido' });
    }

    if (!reward) {
        return res.status(400).json({ error: 'Recompensa indefinido' });
      }

    if (!user_id) {
      return res.status(400).json({ error: 'Usuário indefinido' });
    }

    const achievement = await achievementModel.createAchievement(name, reward, user_id);

    return res.status(200).json(achievement);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

module.exports = router;
