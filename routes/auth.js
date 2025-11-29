const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/auth');  

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    const fighter = rows[0];
    if (!fighter || !(await bcrypt.compare(password, fighter.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: fighter.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, fighter: { id: fighter.id, name: fighter.name, email: fighter.email } });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});


router.get('/user', verifyToken, async (req, res) => {
  try {
  const [rows] = await db.query('SELECT name, email, weight FROM user');
    res.json(rows);
  } catch (error) {
    console.log(error);  
    res.status(500).json({ error: 'Erro ao listar lutadores' });
  }
});

module.exports = router;