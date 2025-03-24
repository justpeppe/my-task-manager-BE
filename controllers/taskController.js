const Task = require('../models/Task'); // importo il model Task

// con CREATE creo una nuova Task
exports.createTask = async (req, res) => { 
    try {    
        // definisco titolo, descrizione, svolta e userId come req.body
        const { titolo, descrizione, svolta, userId } = req.body; 
        
        // restituisco un errore se titolo, descrizione, svolta o userId non sono presenti
        if (!titolo || !descrizione || !svolta || !userId) {
            return res.status(400).json({ error: 'Titolo, descrizione, svolta e userId sono obbligatori'
            }); 
        }

        // creo una nuova Task con await Task.create() con valori titolo, descrizione, svolta e userId
        const newTask = await Task.create({ titolo, descrizione, svolta, userId }); 

        // restituisco la nuova Task
        res.status(201).json(newTask); 

    } catch (err) {
        // restituisco l'errore
        res.status(500).json({ error: 'Errore nella creazione della task' }); 
    }
};

// con GET ottengo tutte le Task
exports.getAllTasks = async (req, res) => {
    try {
        // trovo tutte le Task con await Task.findAll() e le copio in tasks
        const tasks = await Task.findAll(); 

        // restituisco tutte le Task
        return res.json (tasks); 

    } catch (err) {
        // restituisco l'errore
        res.status(500).json({ error: 'Errore nel recupero di tutte le task' }); 
    }
};

// con GET ottengo una singola Task
exports.getTaskById = async (req, res) => {

    try {
        // definisco id come req.params
        const { id } = req.params;
        
        // trovo una Task per ID con await Task.findByPk(id)
        const task = await task.findByPk(id);

        // se non trovo una Task con quell'ID restituisco un errore
        if (!task) {
            return res.status(404).json({ error: 'Task non trovata' });
        }

        // restituisco la task trovata
        return res.json (task) 

    } catch (err) {
        // restituisco l'errore
        res.status(500).json({ error: 'Errore nell ottenere la singola task' });
    }
};

// con PUT aggiorno una Task
exports.updateTask = async (req, res) => {
    try {
        // definisco id come req.params
        const { id } = req.params;

        // definisco i nuovi titolo, descrizione, svolta come req.body
        const { titolo, descrizione, svolta, userId } = req.body;

        // trovo una Task per ID con await Task.findByPk(id)
        const task = await Task.findByPk(id);

        // se non trovo una Task con quell'ID restituisco un errore
        if (!task) {
            return res.status(404).json({ error: 'Task non trovata' });
        }

        // aggiorno la Task con i nuovi valori
        task.titolo = titolo;
        task.descrizione = descrizione;
        task.svolta = svolta;
        task.userId = userId;

        // salvo la Task aggiornata con await task.save()
        await task.save();

        // restituisco la Task aggiornata
        return res.json(task);
        
    } catch (err) {
        // restituisco l'errore
        res.status(500).json({ error: 'Errore nell aggiornare la task' });
    }
};

// con DELETE elimino una Task
exports.deleteTask = async (req, res) => {
    try {
        // definisco id come req.params
        const { id } = req.params;

        // elimino la Task con await Task.destroy({ where: { id } })
        const deletedTask = await task.destroy({ where : { id } }); 

        // se non trovo una Task con quell'ID restituisco un errore
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task non trovata' });
        }
       
        // restituisco un messaggio di successo
        return res.status(204).send(); // 204 No Content
        
    } catch (err) {
        // restituisco l'errore
        res.status(500).json({ error: 'Errore nell eliminare la task' });
    }
};