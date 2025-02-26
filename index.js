const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoute = require('./routes/userRoute.js');
const jobRoute = require('./routes/jobRoute.js');
const errorHandler = require('./middleware/errorHandler.js');
const cors = require('cors');


const PORT = process.env.PORT || 4000;
const app = express();

const corsOptions = {
    origin: 'https://job-finder-frontend-omega.vercel.app/',  // Your frontend URL
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

app.use('/user', userRoute);
app.use('/job', jobRoute);

app.get('/health', (req, res) => {
    res.json({
        message: 'Job Listing API is working fine',
        status: 'Working',
        date: new Date().toLocaleDateString()
    });
});

// Define the root route before the wildcard route
app.get('/', (req, res) => {
    res.send('Everything perfect');
});

app.use("*", (req, res) => {
    res.status(404).json({
        message: 'Endpoint not found',
        status: 'Error',
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on port ${PORT}`);
});
