const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token ausente' });
  }

  const [scheme, token] = authHeader.split(' ');
  
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token expirado ou inválido' });
  }
}

module.exports = { verifyToken };

const { verifyToken } = require('./auth');

function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Acesso negado. Apenas admins.' });
    }
    next();
  });
}

module.exports = { verifyAdmin };