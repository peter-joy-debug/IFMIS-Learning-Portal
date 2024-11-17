const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const auth = require('../middleware/auth');
const {upload} = require('../middleware/upload');

// router.post('/create', auth, upload.array('attachments', 10), ticketController.createTicket);
router.post('/create', auth, upload.array('attachments', 10), ticketController.createTicket);
router.get('/user', auth, ticketController.getTicketsByUser); // Move this above other routes
router.get('/files/:fileId', auth, ticketController.getFile);
router.get('/files', auth, ticketController.getAllFiles); // Add route for retrieving all files
router.delete('/files', auth, ticketController.deleteFiles);
router.delete('/files/:fileId', auth, ticketController.deleteFileById);
router.post('/addUserToShared', auth, ticketController.addUserToShared);
router.post('/addUserToAssigned', auth, ticketController.addUserToAssigned);
router.post('/changeStatus', auth, ticketController.changeTicketStatus);
router.post('/revokeUserFromAssigned', auth, ticketController.revokeUserFromAssigned);
router.post('/revokeUserFromShared', auth, ticketController.revokeUserFromShared);
// router.post('/addReply', auth, ticketController.addReplyToTicket);
router.post('/addReply', auth, upload.array('attachments', 10), ticketController.addReplyToTicket);
// router.put('/updateReply', auth, ticketController.updateReply);
router.put('/updateReply', auth, upload.array('attachments', 10), ticketController.updateReply);
// router.put('/update', auth, ticketController.updateTicket);
router.put('/update', auth, upload.array('attachments', 10), ticketController.updateTicket);
router.get('/:ticketId/replies', auth, ticketController.getRepliesByTicket);
router.get('/', auth, ticketController.getAllTickets);
router.get('/:ticketId', auth, ticketController.getTicketById);
// Define the route to get tickets by user
// router.get('/user', auth, ticketController.getTicketsByUser);


module.exports = router;
