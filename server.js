const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/api/netflix', require('./src/routes/api/netflix'));

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});