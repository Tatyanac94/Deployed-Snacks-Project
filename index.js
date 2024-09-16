require('dotenv').config(); 
const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRouter = require('./api/index'); 

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

app.get('/snacks', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'snacks.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use((request, response, next) => {
    response.status(404).json({
      error:
        "Resource not found. Are you sure you're looking in the right place?",
    });
  });
  
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
