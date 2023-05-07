const express = require('express');
const fs = require('fs');

const app = express();
//console.log(app)

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

app.get('/about', (req, res)=> {
    res.send(`<h1>About Route</h1>`)
})

app.get('/help', (req, res)=> {
    res.send(`<h1>Help Route</h1>`)
})

app.listen(4000, () => {
    console.log("Server runnign on 4000")
})