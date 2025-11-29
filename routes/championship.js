const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.post('/register', async (req, res) => {
  const { name, date, location } = req.body;
  try {
    await db.query(
      'INSERT INTO championship (name, date, location) VALUES (?, ?, ?)',
      [name, date, location]
    );
    res.status(201).json({ message: 'Campeonato cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar campeonato' });
  }
});

module.exports = router;