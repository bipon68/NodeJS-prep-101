const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const shortid  = require('shortid')
const fs = require('fs/promises');
const path = require('path');
// const dbLocation = path.resolve('src', 'data.json')

const app = express();

app.use([morgan('dev'), cors(), express.json()]);
app.use('/api/v1/tickets', require('./routes'));

app.get('/health', (_req, res) => {
    res.status(200).json({status: 'OK'})
})


app.use((req, res, next) => {
    const error = new Error('404 Not Found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    console.log('Error', error)
    if(error.status){
       return res.status(error.status).json({
           message: error.message
       })
    }
    res.status(500).json({message: 'Something went wrong.'})
})

/**
 * This is a test function
 * @param {string} name pass your name
 * @returns {boolean}
 */
function testFunc(name){
   
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is listening on PORT ${port}`);
    console.log(`localhost:${port}`)
});