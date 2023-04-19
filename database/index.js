import mongoose from 'mongoose';
import dontenv from 'dotenv'
dontenv.config()

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));