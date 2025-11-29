const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { name, email, password, age, weight, gender, belt } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO user (name, email, age, weight, gender, belt, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, age, weight, gender, belt, hashedPassword]
    );
    res.status(201).json({ message: 'Lutador cadastrado com sucesso' });
  } catch (error) { 
    res.status(500).json({ error: 'Erro ao cadastrar lutador' });
  }
});

module.exports = router;