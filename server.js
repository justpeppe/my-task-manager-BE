const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

app.use (cors()); 
app.use(cors(
    {
        origin: 'http://localhost:3001', // URL del client che può accedere alle API
        methods : ['GET', 'POST', 'PUT', 'DELETE'], // Metodi HTTP che il client può utilizzare
    }
));

app.use('/task', taskRoutes);
app.use('/user', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});