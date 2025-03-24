const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

module.exports = (req, res, next) => {
    // Estraiamo il token dall'header della richiesta
    const authHeader = req.headers['authorization'];

    // Se l'header non è presente, restituiamo un errore
    if (!authHeader) {
        return res.status(401).json({ error: 'Token assente' });
    }

    // authHeader di solito è "Bearer <token>"
    // Estraiamo il token dalla stringa
    const token = authHeader.split(' ')[1];

    // Se il token non è presente, restituiamo un errore
    if (!token) {
        return res.status(401).json({ error: 'Token malformato' });
    }

    
    try {
        // Verifichiamo il token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Salviamo le info decode sul req per usarle dopo
        req.user = decoded;

        // Se il token è valido, chiamiamo next() per passare al controller successivo
        next(); 
    } catch (err) {
        // Se c'è un errore, restituiamo un errore 403
        console.error('authMiddleware error:', err);
        return res.status(403).json({ error: 'Token non valido' });
    }
}