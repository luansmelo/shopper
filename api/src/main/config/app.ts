import express from 'express'
import setupMiddlewares from './middlewares';

const app = express()
const PORT = 3000
setupMiddlewares(app)
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
export default app