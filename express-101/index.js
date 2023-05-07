const express = require('express');

const cors = require('cors');
const morgan = require('morgan')

const app = express();
// const router = express.Router();
//console.log(app)

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(globalMiddleware)
// app.use(router)
app.use( require('./routes'))


app.listen(4000, () => {
    console.log("Server runnign on 4000")
})

function MiddlewareSignature(req, res, next){
   next();
}

function globalMiddleware(req, res, next){
    console.log(`${req.method} - ${req.url}`);
    console.log('I am a global middleware')
    if(req.query.bad){
        return res.status(400).send('Bad Request')
    }
    next();
}

function localMiddleware(req, res, next){
    console.log('I am a local middleware')
    next();
}