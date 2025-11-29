require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fightersRoutes = require('./routes/user');
const championshipsRoutes = require('./routes/championship');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', fightersRoutes);
app.use('/championship', championshipsRoutes);
app.use('/auth', authRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));