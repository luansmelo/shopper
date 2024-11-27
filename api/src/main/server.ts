import 'module-alias/register'
import dotenv from 'dotenv'
dotenv.config()
import app from './config/app'
import { sequelize } from '@/config/database.config'

const port = Number(process.env.PORT) || 3000

sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Server running at ${port} port`))
}).catch(console.error)
