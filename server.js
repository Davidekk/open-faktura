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

//db
import connect from "./db/connect.js";

//req errors
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";




if (process.env.NODE_ENV !== 'production')
    app.use(morgan('dev'))


app.use(json())
app.use('/api/v1/auth', auth)
app.use('/api/v1/profile', authJWT, profile)
app.use('/api/v1/clients', authJWT, clients)

app.get("/", (req, res) => {

    res.status(OK).json({msg: "Working..."})
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