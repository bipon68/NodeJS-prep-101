const router = require('express').Router();
const {sellBulkTicket, sellSingleTicket, findAll, findById, findByUsername} = require('./controller')

// router.get('/t/:id');
// router.put('/t/:id');
// router.delete('/t/:id');

router.route('/t/:id').get(findById).put().delete();
router.route('/u/:username').get(findByUsername).put().delete();

// router.get('/u/:username');
// router.put('/u/:username');
// router.delete('/u/:username');

router.post('/bulk', sellBulkTicket);
router.get('/draw');

// router.post('/');
// router.get('/');
router.route('/').get(findAll).post(sellSingleTicket);


module.exports = router;