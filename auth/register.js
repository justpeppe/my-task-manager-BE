// controllers/authController.js

const { User } = require('../models');
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
try {
    // Estraggo email, password e userId da req.body
    const { email, password, username } = req.body;

    // Controllo se email e password sono presenti
    if (!email || !password) {
        return res.status(400).json({ error: 'Email e password richiesti' });
    }

    // Verifico se l'utente esiste già
    const existingUser = await User.findOne({ where: { email } });
    // Se esiste, restituisco un errore
    if (existingUser) {
        return res.status(400).json({ error: 'Email già in uso' });
    }

    // Creo una password hashata con bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Creo un nuovo utente con email, password e username
    const newUser = await User.create({
        email,
        password: hashedPassword,
        username
    });
    
    // Restituisco un messaggio di successo
    return res.status(201).json({ message: 'Utente creato', userId: newUser.id
});
} catch (err) {
    // Se c'è un errore, lo loggo e restituisco un errore 500
    console.error('Errore registrazione:', err);
    return res.status(500).json({ error: 'Errore server' });
}
}