const express = require('express');
const cors = require('cors');
const explainRoute = require('./routes/explain');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/explain', explainRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
