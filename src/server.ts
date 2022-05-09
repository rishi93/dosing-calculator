import express from 'express';
import mongoose from 'mongoose';

import { getDailyPills } from './controller';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';

// Initalize express app
const app = express();

// Connect to local database
mongoose.connect('mongodb://db:27017/test');

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
const HOST = '0.0.0.0';
const PORT = 8080;
app.listen(PORT, HOST, () => {
    console.log(`App listening on PORT ${PORT}`);
});

export default app;