import { api, PORT } from './api/index.js'
import './database/index.js'

api.listen(PORT, () => {
  console.log('Hola mundo desde el puerto' + ' ' + PORT)
})