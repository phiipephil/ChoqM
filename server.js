const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname));

const port = 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
