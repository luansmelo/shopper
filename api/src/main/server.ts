import 'module-alias/register'
import dotenv from 'dotenv'
dotenv.config()
import app from './config/app'
import { sequelize } from '@/config/database.config'

const port = Number(process.env.PORT) || 3000

sequelize.sync().then(() => {
    console.log("Banco de dados conectado e sincronizado!");
}).catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error);
});

app.listen(port, () => {
    console.log(`Server running at ${port} port`)
})