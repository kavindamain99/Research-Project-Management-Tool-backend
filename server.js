import express from 'express';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cors());
app.use(expressValidator());

const port = process.env.PORT || 3000;

// Supervisor routes
import supervisorRoutes from './routes/supervisor/supervisor.js';
app.use('/api', supervisorRoutes);

// Panel member routes
import panelMemberRoutes from './routes/panel member/panelMember.js';
app.use('/api', panelMemberRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("database connection established");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});