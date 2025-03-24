const express = require('express');
const router = express.Router();
const taskController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Creiamo una nuova Task
router.post('/', authMiddleware, taskController.createTask);
// Ottieni tutte le Task
router.get('/', authMiddleware, taskController.getAllTasks);
// Ottieni una singola Task
router.get('/:id', authMiddleware, taskController.getTaskById);
// Aggiorna una Task
router.put('/:id', authMiddleware, taskController.updateTask);
// Cancella una Task
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;