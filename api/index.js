import express from 'express';
import cors from 'cors'
import router from '../routes/index.js'
import { cloudinaryConfig } from '../database/cloudinary.js';

const api = express()
const PORT = process.env.PORT || 4000

api.use(cors())
api.use('*', cloudinaryConfig)

api.use('/api/v1', router)

export { 
  api,
  PORT
}