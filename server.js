import "express-async-errors"
//server
import express, {json} from "express"

const app = express()

//other imports
import dot from "dotenv"

dot.config()
import {OK} from "http-status-codes";
import morgan from "morgan";
import auth from "./routes/auth.js";
import profile from "./routes/profile.js";
import authJWT from "./middleware/authJWT.js";
import clients from "./routes/clients.js";
import invoice from './routes/invoice.js'
import path from "node:path";
import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

//security
import helmet from "helmet";
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'


//db
import connect from "./db/connect.js";

//req errors
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

if (process.env.NODE_ENV !== 'production')
    app.use(morgan('dev'))

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())


app.use(express.static(path.resolve(__dirname,'./client/build')))

app.use('/api/v1/auth', auth)
app.use('/api/v1/profile', authJWT, profile)
app.use('/api/v1/clients', authJWT, clients)
app.use('/api/v1/invoice', authJWT, invoice)

app.get("/", (req, res) => {

    res.status(OK).json({msg: "Working..."})
})

app.get('*',(req,res)=> {
    res.sendFile(path.resolve(__dirname,'./client/build','index.html'))
})


app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000
const start = async () => {
    try {
        console.log("Connecting to database...")
        await connect(process.env.MONGO_URI)
        console.log("Database ready...")
        app.listen(port, () => {
            console.log(`Server running on port ${port}...`)
        })

    } catch (e) {

    }
}
start()