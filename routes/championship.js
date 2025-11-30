const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyAdmin } = require('../middleware/admin');

router.post('/register', verifyAdmin, async (req, res) => {
  const { name, date, location } = req.body;
  try {
    await db.query(
      'INSERT INTO championship (name, date, location) VALUES (?, ?, ?)',
      [name, date, location]
    );
    res.status(201).json({ message: 'Campeonato cadastrado com sucesso' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Campeonato já existe' });
    }
    console.log(error);
    res.status(500).json({ error: 'Erro ao cadastrar campeonato' });
  }
});

module.exports = router;