import * as express from "express"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import * as cors from 'cors';
import helmet from "helmet";
import routes from './routes/index'


const PORT = process.env.PORT || 3000

AppDataSource.initialize().then(async () => {
   
    const app = express()
// middlewares
app.use(cors());
app.use(helmet())

    app.use(express.json())

    app.use('/',routes)

    app.listen(PORT, ()=>console.log(`SERVER IS RUNNIG ${PORT}`))

}).catch(error => console.log(error))
