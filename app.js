const express = require('express');
require('dotenv').config();
const db = require('./src/db/connection');
const userRoutes = require('./src/routes/userRoutes');
const grpRoutes = require('./src/routes/groupRoutes');
const msgRoutes = require('./src/routes/messageRoutes');
db();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(userRoutes);
app.use(grpRoutes);
app.use(msgRoutes);

app.listen(PORT, () => {
    console.log("App listening on port", PORT);
})


