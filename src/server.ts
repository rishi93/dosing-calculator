import express from 'express';
import mongoose from 'mongoose';

import { PillModel } from './models';
import { getDailyPills } from './controller';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';

// Initalize express app
const app = express();

// Connect to local database
mongoose.connect('mongodb://localhost:27017/test');

/*
PillModel.insertMany([
    { nutrient: "zinc", amount: 22, absorption: 0.15, unit: "mg" },
    { nutrient: "zinc", amount: 30, absorption: 0.1, unit: "mg" },
    { nutrient: "zinc", amount: 50, absorption: 0.1, unit: "mg" },
    { nutrient: "vitamin d3", amount: 1000, absorption: 0.78, unit: 'iU' },
    { nutrient: "vitamin d3", amount: 3000, absorption: 0.78, unit: "iU" },
    { nutrient: "omega 3", amount: 750, absorption: 1.0, unit: "mg" },
    { nutrient: "omega 3", amount: 1400, absorption: 1.0, unit: "mg" }
]);
*/

// Middleware stuff
// Enable CORS for all routes
const cors = require('cors');
app.use(cors());
// Enable JSON parser
app.use(express.json());

app.post('/dnd', getDailyPills);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

export default app;