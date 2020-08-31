require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const CLIENT_PATH = path.join(__dirname, '../client/dist');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(CLIENT_PATH));

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
