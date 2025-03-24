const express = require('express');
const cors = require('cors'); 
const app = express();

// Importo le rotte per le Task
const taskRoutes = require('./routes/taskRoutes');
// Importo le rotte per gli User
const userRoutes = require('./routes/userRoutes');

app.use (cors()); 
// Configurazione di CORS
app.use(cors(
    {
        origin: 'http://localhost:3001', // URL del client che può accedere alle API
        methods : ['GET', 'POST', 'PUT', 'DELETE'], // Metodi HTTP che il client può utilizzare
    }
));

// Rotte task
app.use('/task', taskRoutes);
// Rotte user
app.use('/user', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});