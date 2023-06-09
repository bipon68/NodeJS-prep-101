const Ticket = require('./Ticket');
const {readFile, writeFile} = require('./utils')

const tickets = Symbol('tickets')

class TicketCollection{

    constructor(){

       (async function(){
        this[tickets] = await readFile();
       }.call(this));
    }

    /**
     * create and save a new ticket
     * @param {string} username
     * @param {number} price
     * @returns {Ticket}
     */

    create(username, price){
        const ticket = new Ticket(username, price);
        this[tickets].push(ticket);
        writeFile();
        return ticket;
    }

    /**
     * create buld ticket
     * @param {string} username
     * @param {number} price
     * @param {number} quantity
     * @returns {Ticket[]}
     */
    createBulk(username, price, quantity){
        const result = [];
        for(let i=0; i < quantity; i++){
            const ticket = this.create(username, price);
            result.push(ticket)
        }
        writeFile(this[tickets])
        return result;
    }

    /**
     * return all tickets from db
     */
    find(){
        return this[tickets];
    }

    /**
     * find single ticket by id
     * @param {string} id
     * @return {Ticket}
     */
    findById(id){
        const ticket = this[tickets].find(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.id === id
        );
        return ticket;
    }

    /**
     * find tickets by username
     * @param {string} username
     * @return {Ticket[]}
     */
         findByUsername(username){
            const ticket = this[tickets].filter(
                /**
                 * @param {Ticket} ticket
                 */
                (ticket) => ticket.username === username
            );
            return tickets;
        }
    /**
     * Update by id
     * @param {string} ticketId
     * @param {{username: string, price: number}} ticketBody
     * @returns {Ticket}
     */

    updateById(ticketId, ticketBody){
        const ticket = this.findById(ticketId);
        if(ticket){
            ticket.username = ticketBody.username ?? ticket.username;
            ticket.price = ticketBody.price ?? ticket.price;
        }
        writeFile(this[tickets])
        return ticket;
    }

/**
 * bulk update by username 
 * @param {string} username
 * @param {{username: string, price: number}} ticketBody
 * @param {Ticket[]}
 */
udpateBulk(username, ticketBody){
    const userTickets = this.findByUsername(username);
    const updateTickets = userTickets.map(
        /**
         * 
         * @param {Ticekt} ticket 
         * @returns 
         */
        (ticket) => this.updateById(ticket.id, ticketBody)
    )
    writeFile(this[tickets]);
    return updateTickets;
}

/**
 * 
 * @param {string} ticketId 
 * @returns {boolean}
 */
    deleteById(ticketId){
        const index = this[tickets].findIndex(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.id === ticketId
        )
        if(index === -1){
            return false
        }else{
            this[tickets].slice(index, 1);
            writeFile(this[tickets]);
            return true;
        }
    }


    /**
     * bulk delete by username
     * @param {string} username 
     * @returns {boolean[]}
     */
deleteBulk(username){
    const userTickets = this.findByUsername(username);
    const deletedResult = userTickets.map(
        /**
         * @param {Ticket} ticket 
         */
        (ticket) => this.deleteById(ticket.id)
    )
    writeFile(this[tickets])
    return deletedResult;
}

/**
 * 
 * @param {number} winnerCount 
 * @returns {Ticket[]}
 */
draw(winnerCount){
    const winnerIndexes = new Array(winnerCount);

    let winnerIndex = 0;
    while(winnerIndex < winnerCount){
        let ticketIndex = Math.floor(Math.random() * this[tickets].length);
        if(!winnerIndex.includes(ticketIndex)){
            winnerIndex[winnerIndex++] = ticketIndex;
            continue;
        }
    }
    const winners = winnerIndex.map(
        /**
         * 
         * @param {number} index 
         * @returns 
         */
        (index) => this[tickets][index]
    )
    return winners;
}

}



const ticketCollection = new TicketCollection();
module.exports = ticketCollection;


