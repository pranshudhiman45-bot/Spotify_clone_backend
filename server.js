const app = require('./src/app')
const connectDB = require('./src/db/db')
require('dotenv').config()
const PORT = 3000

connectDB()
app.listen(PORT, () => {
  console.log(`Server is connected at ${PORT}`)
})
