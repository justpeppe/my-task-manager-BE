// controllers/authController.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');

// JWT_SECRET è una stringa casuale che verrà utilizzata per firmare il token JWT
// Se non è definita come variabile d'ambiente, verrà utilizzata la stringa 'supersecret'
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
exports.login = async (req, res) => {

    try {
        // Estraiamo email e password dalla richiesta
        const { email, password } = req.body;
    
        // Se email o password non sono presenti, restituiamo un errore
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e password sono richiesti' });
        }
    
        // Cerchiamo l'utente con l'email fornita
        const user = await User.findOne({ where: { email } });

        // Se l'utente non esiste, restituiamo un errore
        if (!user) {
            return res.status(401).json({ error: 'Credenziali non valide' });
        }
        
        // Verifichiamo la password
        const match = await bcrypt.compare(password, user.password);
    
        // Se la password non corrisponde, restituiamo un errore
        if (!match) {
            return res.status(401).json({ error: 'Credenziali non valide' });
        }
        
        // Se l'utente esiste e la password corrisponde, creiamo un token JWT
        const payload = { userId: user.id, email: user.email };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
        // Restituiamo il token
        return res.json({ token });
    } catch (err) {
        // In caso di errore, restituiamo un errore 500
        console.error('Errore login:', err);
        return res.status(500).json({ error: 'Errore server' });
    }
};