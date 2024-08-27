const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth'); // Path to the auth.js in the routes directory

const app = express();

app.use(express.json());
app.use(cors());

// Use the auth routes
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/login_system', {  })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
