const express = require('express')
const morgan = require('morgan')
const rateLimit = require("express-rate-limit")
const helmet = require('helmet')
const mongosanitize = require("express-mongo-sanitize")
const xss = require('xss-clean')
const hpp=require('hpp')
const taskRouter=require("./routes/TaskRoutes")
const cors=require("cors")

const app = express()
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}
app.use(cors())
app.use(helmet())
const limiter = rateLimit({
    max: 1000,
    windowMs: 30 * 60 * 1000,
    message:'Too many request from this ip please try again , in an hour'
})
//Data sanitization againaist Nosql query injection
app.use(mongosanitize());
//Data sanitization againaist xss
app.use(xss())
//prevent parameter pollution
app.use(hpp({
    whitelist: ['duration']
}))
app.use('/api',limiter);
app.use(express.json({limit:'10kb'}))
app.use(express.static(`${__dirname}/public`))

//Routes
app.use(`/api/v1/tasks`,taskRouter )


    app.all('*', (req, res,next) => {
       
       return res.status(404).json({message:'Invalid request'})
    })


module.exports = app