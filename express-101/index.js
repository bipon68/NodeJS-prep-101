const express = require('express');
const fs = require('fs');
const cors = require('cors');
const morgan = require('morgan')

const app = express();
//console.log(app)

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(globalMiddleware)

app.get('/', (req, res)=> {
    fs.readFile('./pages/index.html', (err, data) => {
        if(err){
            console.log('Error', err);
            res.send('<h1>Something wrong<h1>')
        }else{
            res.write(data);
            res.end();
        }
    })
})

app.get('/about', localMiddleware, (req, res)=> {
    res.send(`<h1>About Route</h1>`)
})

app.get('/help', (req, res)=> {
    res.send(`<h1>Help Route</h1>`)
})

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