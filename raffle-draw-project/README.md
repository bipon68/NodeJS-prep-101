# Raffle Draw Project

### Project Creation Step by Step
- npm init -y
- nodemon: `npm i -D nodemon`
- For ID - `npm i shortid`
- run project: `npm run dev`

**package.json file**

```node
 "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
```

**Reference**
- [JSDoc](https://jsdoc.app/)

#### Lottery API

- sell lottery ticket
- update lottery ticket
- delete lottery ticket
- get all tickets
- get ticket by id
- bulk buy (user can buy multiple tickets at a time)
- raffle draw

#### Ticket

- number (unique)
- username
- price
- timestamp

#### Routes

- /tickets/t/:ticketId GET - find single ticket
- /tickets/t/:ticketId PATCH - update ticket by id
- /tickets/t/:ticketId DELETE - delete ticket by id
- /tickets/u/:username GET - find tickets for a given user
- /tickets/u/:username PATCH - update tickets for a given user
- /tickets/u/:username DELETE - delete all tickets for a given user
- /tickets/sell - create tickets
- /tickets/bulk - bulk sell ticket
- /tickets/draw
- /tickets/ - find all tickets


