import 'module-alias/register'
import dotenv from 'dotenv'
dotenv.config()
import app from './config/app'

const port = Number(process.env.PORT) || 3000
app.listen(port, () => {
    console.log(`Server running at ${port} port`)
})