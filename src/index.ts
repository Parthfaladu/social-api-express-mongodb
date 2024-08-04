import express, {json} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';

//routes
import routes from './routes/router';

// init app
const app = express();

dotenv.config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/social-media';

// connect to MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true}, () => {
    console.log('Connected to MongoDB');
});

//middleware
app.use(json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api', routes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`app listening on port ${process.env.SERVER_PORT}`);
});