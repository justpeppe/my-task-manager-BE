const { User } = require('../models');

// con CREATE creo un nuova User
exports.createUser = async (req, res) => { 
    
    try {    
        // definisco email, password, e  da req.body
        const { email, password } = req.body; 
        
        // restituisco un errore se email, password o non sono presenti
        if (!email || !password ) {
            return res.status(400).json({ error: 'email e password sono obbligatori'
            }); 
        }
        console.log(User)
        // creo un nuovo User con await User.create() con valori email, password e userId
        const newUser = await User.create({ email, password }); 

        // restituisco la nuova User
        res.status(201).json(newUser); 

    } catch (err) {
        // restituisco l'errore
        
        res.status(500).json({ error: err.message }); 
    }
};

// con GET ottengo tutte gli User
exports.getAllUsers = async (req, res) => {
    try {
        // trovo tutte gli User con await User.findAll() e le copio in Users
        const users = await User.findAll(); 

        // restituisco tutte gli User
        return res.json (users); 

    } catch (err) {
        // restituisco l'errore
        res.status(500).json({ error: err.message }); 
    }
};

// con GET ottengo un singolo User
exports.getUserById = async (req, res) => {

    try {
        // definisco id da req.params
        const { id } = req.params;
        
        // trovo una User per ID con await User.findByPk(id)
        const User = await User.findByPk(id);

        // se non trovo un User con quell'ID restituisco un errore
        if (!User) {
            return res.status(404).json({ error: 'User non trovato' });
        }

        // restituisco l'User trovato
        return res.json (User) 

    } catch (err) {
        // restituisco l'errore
        res.status(500).json({ error: 'Errore nell ottenere il singolo User' });
    }
};

// con PUT aggiorno un User
exports.updateUser = async (req, res) => {
    try {
        // definisco id da req.params
        const { id } = req.params;

        // definisco i nuovi email, password da req.body
        const { email, password, userId } = req.body;

        // trovo un User per ID con await User.findByPk(id)
        const User = await User.findByPk(id);

        // se non trovo un User con quell'ID restituisco un errore
        if (!User) {
            return res.status(404).json({ error: 'User non trovato' });
        }

        // aggiorno la User con i nuovi valori
        User.email = email;
        User.password = password;
        User.userId = userId;

        // salvo l'User aggiornato con await User.save()
        await User.save();

        // restituisco l'User aggiornato
        return res.json(User);
        
    } catch (err) {
        // restituisco l'errore
        res.status(500).json({ error: 'Errore nell aggiornare l User' });
    }
};

// con DELETE elimino una User
exports.deleteUser = async (req, res) => {
    try {
        // definisco id da req.params
        const { id } = req.params;

        // elimino l User con await User.destroy({ where: { id } })
        const deletedUser = await User.destroy({ where : { id } }); 

        // se non trovo un User con quell'ID restituisco un errore
        if (!deletedUser) {
            return res.status(404).json({ error: 'User non trovato' });
        }
       
        // restituisco un messaggio di successo
        return res.status(204).send(); // 204 No Content
        
    } catch (err) {
        // restituisco l'errore
        res.status(500).json({ error: 'Errore nell eliminare l User' });
    }
};