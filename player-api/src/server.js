const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const shortid  = require('shortid')
const fs = require('fs/promises');
const path = require('path');
const dbLocation = path.resolve('src', 'data.json')

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

/**
 * Player API
 * CRUD     - Create Read Update Delete
 * GET      - /     - find all players
 * POST     - /     - create a new player and save into db
 * GET      - /:id  - find a single player by id
 * PUT      - /:id  - update or create player
 * PATCH    - /:id  - update player
 * DELETE   - /id   - delete player from db
 */

app.post('/', async(req, res) => {

    const player = {
        ...req.body,
        id: shortid.generate()
    }
    const data = await fs.readFile(dbLocation);
    const players = JSON.parse(data);
    players.push(player);

    await fs.writeFile(dbLocation, JSON.stringify(players))
    console.log(players)
    res.status(201).json(player)
    

    // res.status(201).json({message: "Post created successfully."})

})

app.get('/', async (req, res) => {
    const data = await fs.readFile(dbLocation);
    const players = JSON.parse(data);
    res.status(200).json(players);
})

// app.get('/:id', async (req, res) => {
//     const id = req.params.id;

//     const data = await fs.readFile(dbLocation);
//     const players = JSON.parse(data);
//     const player = players.find((item) => item.id === id);

//     if(!player){
//         return res.status(404).json({message: 'Player not found.'})
//     }

//     res.status(200).json(player);
// })

app.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const data = await fs.readFile(dbLocation);
    const players = JSON.parse(data);
    const player = players.find((item) => item.id === id);

    player.name = req.body.name || player.name;

    await fs.writeFile(dbLocation, JSON.stringify(players));

    res.status(200).json(player)

//   res.status(200).json({message: "Post updated successfully"})
})



app.get('/health', (_req, res) => {
    res.status(200).json({status: 'OK'})
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is listening on PORT ${port}`);
    console.log(`localhost:${port}`)
});