const express = require('express');

const app = express();

app.use(express.static('./dist/eshop'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/eshop/'}),
);

app.listen(process.env.PORT || 8080);