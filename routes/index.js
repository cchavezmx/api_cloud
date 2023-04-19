import express from 'express'
import multer from 'multer'
import Datauri from 'datauri/parser.js'
import path from 'path'
import { uploader } from '../database/cloudinary.js'
// servicio MVC
import Product from '../models/Product.js';


const router = express.Router()

router.get('/hola', (req, res) => {
  return res.send('hola a todos')
})

// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`)
//   }
// })

// const localhostMulter = multer({ storage: multerStorage })
const upload = multer({ storage: multer.memoryStorage()})
router.post('/upload', upload.single('formData'), (req, res) => {

  const validTypes = ['image/png', 'image/jpg']

  if (!validTypes.includes(req.file.mimetype)) {
    res.status(401).json({ error: 'Invalid file Type'})
  }
 
  const dUri = new Datauri()
  const { name } = req.body
  try {
    const file = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer)
    return uploader.upload(file.content)
    .then(async(result) => {
      console.log('upload to cloudinary')
      const newProduct = new Product({ url: result.url, metadata: result })
      await newProduct.save()
      console.log(result)
      return res.send('upload')
    })

  } catch (error) {
    return res.status(401).json({ error: error.message })
  }

})

router.get('/products', async(req, res) => {
  try {
    return Product.find({})
      .then(result => {
        return res.status(200).json({ products: result })
      })
  } catch(error) {
    return res.status(400).json({ error: 'Error al traer los datos de la base de datos'})
  }
})

// --- BACKEND ---
// API PARA GENERAR LOS DATOS DEL PRODUTO: EAN, NOMBRE, DESCRIP, DOCUMENTO DE MONGO _ID 1
// API PARA SUBIR LA IMAGEN  2
// ---- FRONT ----
// SUBIR EL ARCHIVO Y GENERAR LA URL 1 
// BUSCAR EL DOCUMENTO CON EL _ID DE LA API ANTERIOR 2
// ACTUALIZAS ESE DOCUMENTO. 2

export default router