require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('../db/db.js')

const PORT = process.env.PORT || 3000;
const CLIENT_PATH = path.join(__dirname, '../client/dist');
const INDEX_PATH = path.join(__dirname, '../client/dist/index.html');


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(CLIENT_PATH));

app.get('/*', function(req, res) {
  res.sendFile(path.join(INDEX_PATH), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
