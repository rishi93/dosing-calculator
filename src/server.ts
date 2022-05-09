import express from 'express';
import mongoose from 'mongoose';

import { getDailyPills } from './controller';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';

// Server settings
const HOST = '0.0.0.0';
const PORT = 8080;
const DB_URL = 'mongodb://db:27017/test';

// Initalize express app
const app = express();

// Connect to local database
mongoose.connect(DB_URL)
    .then(() => {
        console.log(`Connected to ${DB_URL} successfully`)
    })
    .catch(() => {
        console.log(`Failed to connect to ${DB_URL}`);
        process.exit();
    });

// Middleware stuff
// Enable CORS for all routes
const cors = require('cors');
app.use(cors());
// Enable JSON parser
app.use(express.json());

// Routes
app.post('/dnd', getDailyPills);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
/*
app.listen(PORT, HOST, () => {
    console.log(`App listening on PORT ${PORT}`);
*/
export default app;