const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid'); // Import the UUID generator
// exports.createTicket = async (req, res) => {
//   const { subject, detail, department, assignedTo, attachments, shared, visibility } = req.body;
//   const userId = req.user.id;

//   try {
//     const ticket = await prisma.ticket.create({
//       data: {
//         senderId: userId,
//         subject,
//         detail,
//         department,
//         assignedTo,
//         attachments,
//         shared,
//         visibility,
//       },
//     });
//     res.status(201).json({
//         message: 'Ticket created successfully',
//         ticket,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to create ticket',
//         error: err.message,
//       });
//     }
// };

// exports.createTicket = async (req, res) => {
//   const { subject, detail, department, assignedTo, attachments, shared, visibility } = req.body;
//   const userId = req.user.id; // Assuming user ID is from the authenticated token

//   try {
//     const ticket = await prisma.ticket.create({
//       data: {
//         senderId: userId,
//         subject,
//         detail,
//         department: Array.isArray(department) ? department : department.split(','), // Ensure it's an array
//         assignedTo: assignedTo ? assignedTo.map(Number) : [], // Convert assignedTo to an array of integers
//         attachments: attachments || [], // Default to an empty array if undefined
//         shared: shared ? shared.map(Number) : [], // Convert shared to an array of integers
//         visibility,
//       },
//     });

//     res.status(201).json({
//       message: 'Ticket created successfully',
//       ticket,
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: 'Failed to create ticket',
//       error: err.message,
//     });
//   }
// };

// exports.createTicket = async (req, res) => {
//     const { subject, detail, department, assignedTo, attachments, shared, visibility } = req.body;
//     const userID = req.user.id; // Assuming user ID is a UUID from the authenticated token
//     console.log("ID: ",userID);
    
//     try {
//       const ticket = await prisma.ticket.create({
//         data: {
//           senderId: userID, // UUID from token
//           subject,
//           detail,
//           department: Array.isArray(department) ? department : department.split(','), // Ensure it's an array
//           assignedTo: assignedTo ? assignedTo : [], // Expect UUIDs directly
//           attachments: attachments || [], // Default to an empty array if undefined
//           shared: shared ? shared : [], // Expect UUIDs directly
//           visibility,
//         },
//       });
  
//       res.status(201).json({
//         message: 'Ticket created successfully',
//         ticket,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to create ticket',
//         error: err.message,
//       });
//     }
//   };
  

// exports.createTicket = async (req, res) => {
//     const { subject, detail, department,attachments } = req.body;
//     const userID = req.user.id; // Extract user ID from the authenticated token

//     console.log('User ID: ', userID);
  
//     try {
//       // Check if user exists
//       const attachments = req.files ? req.files.map((file) => file.path) : []; // Capture file paths
//       const userExists = await prisma.sec_system_user.findUnique({
//         where: { id: userID }, // Adjust based on actual User model
//       });
  
//       if (!userExists) {
//         return res.status(400).json({
//           message: 'User does not exist. Cannot create ticket.',
//         });
//       }
  
//       const ticket = await prisma.tickets.create({
//         data: {
//           id: uuidv4(), // Generate a unique UUID for the reply
//           senderId:userID, // UUID from token
//           subject,
//           detail,
//           department: Array.isArray(department) ? department : department.split(','), // Ensure it's an array
//           attachments, // Default to an empty array if undefined
//         //   shared: shared ? shared : [], // Expect UUIDs directly
//         },
//       });
  
//       res.status(201).json({
//         message: 'Ticket created successfully',
//         ticket,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to create ticket',
//         error: err.message,
//       });
//     }
//   };

exports.createTicket = async (req, res) => {
  const { subject, detail, department } = req.body;
  const userID = req.user.id; // Extract user ID from the authenticated token

  console.log('User ID: ', userID);

  try {
    // Check if user exists
    const attachmentPaths = req.files ? req.files.map((file) => file.path) : []; // Capture file paths
    const userExists = await prisma.sec_system_user.findUnique({
      where: { id: userID }, // Adjust based on actual User model
    });

    if (!userExists) {
      return res.status(400).json({
        message: 'User does not exist. Cannot create ticket.',
      });
    }

    const ticket = await prisma.tickets.create({
      data: {
        id: uuidv4(), // Generate a unique UUID for the ticket
        senderId: userID, // UUID from token
        subject,
        detail,
        department: Array.isArray(department) ? department : department.split(','), // Ensure it's an array
        attachments: attachmentPaths, // Default to an empty array if undefined
      },
    });

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket,
    });
  } catch (err) {
    console.error('Error creating ticket:', err); // Log detailed error for debugging
    res.status(400).json({
      message: 'Failed to create ticket',
      error: err.message,
    });
  }
};
  

// exports.addUserToShared = async (req, res) => {
//     const { ticketId, userId } = req.body;
  
//     try {
//       const ticket = await prisma.ticket.update({
//         where: { id: ticketId },
//         data: {
//           shared: {
//             push: userId, // Adds userId to the shared array
//           },
//         },
//       });
  
//       res.status(200).json({
//         message: 'User added to shared successfully',
//         ticket,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to add user to shared',
//         error: err.message,
//       });
//     }
//   };

exports.addUserToShared = async (req, res) => {
    const { ticketId, userId } = req.body;
    const requesterId = req.user.id; // Assuming the ID of the authenticated user
  
    try {
      const ticket = await prisma.tickets.findUnique({
        where: { id: ticketId },
        select: { shared: true, senderId: true }, // Fetch only shared and senderId
      });
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      if (ticket.senderId === userId) {
        return res.status(400).json({ message: "Owner can't add themselves to shared" });
      }
  
      if (ticket.shared.includes(userId)) {
        return res.status(400).json({ message: 'User is already in the shared list' });
      }
  
      const updatedTicket = await prisma.ticket.update({
        where: { id: ticketId },
        data: {
          shared: {
            push: userId,
          },
        },
      });
  
      res.status(200).json({
        message: 'User added to shared successfully',
        ticket: updatedTicket,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to add user to shared',
        error: err.message,
      });
    }
  };
  
  
//   exports.addUserToAssigned = async (req, res) => {
//     const { ticketId, userId } = req.body;
  
//     try {
//       const ticket = await prisma.ticket.update({
//         where: { id: ticketId },
//         data: {
//           assignedTo: {
//             push: userId, // Adds userId to the assignedTo array
//           },
//         },
//       });
  
//       res.status(200).json({
//         message: 'User assigned to ticket successfully',
//         ticket,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to assign user to ticket',
//         error: err.message,
//       });
//     }
//   };

exports.addUserToAssigned = async (req, res) => {
    const { ticketId, userId } = req.body;
    const requesterId = req.user.id; // Assuming the ID of the authenticated user
  
    try {
      const ticket = await prisma.tickets.findUnique({
        where: { id: ticketId },
        select: { assignedTo: true, senderId: true }, // Fetch only assignedTo and senderId
      });
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      if (ticket.senderId === userId) {
        return res.status(400).json({ message: "Owner can't assign themselves" });
      }
  
      if (ticket.assignedTo.includes(userId)) {
        return res.status(400).json({ message: 'User is already assigned to this ticket' });
      }
  
      const updatedTicket = await prisma.tickets.update({
        where: { id: ticketId },
        data: {
          assignedTo: {
            push: userId,
          },
        },
      });
  
      res.status(200).json({
        message: 'User assigned to ticket successfully',
        ticket: updatedTicket,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to assign user to ticket',
        error: err.message,
      });
    }
  };
  
  


  exports.changeTicketStatus = async (req, res) => {
    const { ticketId, status } = req.body;
  
    try {
      const ticket = await prisma.tickets.update({
        where: { id: ticketId },
        data: {
          status, // Updates the status field
        },
      });
  
      res.status(200).json({
        message: 'Ticket status updated successfully',
        ticket,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to update ticket status',
        error: err.message,
      });
    }
  };
  
exports.revokeUserFromAssigned = async (req, res) => {
    const { ticketId, userId } = req.body;
  
    try {
      // Find the current ticket
      const ticket = await prisma.tickets.findUnique({
        where: { id: ticketId },
        select: { assignedTo: true }, // Only fetch the assignedTo field
      });
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Remove userId from the assignedTo array
      const updatedAssignedTo = ticket.assignedTo.filter(id => id !== userId);
  
      // Update the ticket with the new assignedTo array
      const updatedTicket = await prisma.tickets.update({
        where: { id: ticketId },
        data: { assignedTo: updatedAssignedTo },
      });
  
      res.status(200).json({
        message: 'User revoked from assigned list successfully',
        ticket: updatedTicket,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to revoke user from assigned list',
        error: err.message,
      });
    }
  };
  




exports.revokeUserFromShared = async (req, res) => {
    const { ticketId, userId } = req.body;
  
    try {
      // Find the current ticket
      const ticket = await prisma.tickets.findUnique({
        where: { id: ticketId },
        select: { shared: true }, // Only fetch the shared field
      });
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Remove userId from the shared array
      const updatedShared = tickets.shared.filter(id => id !== userId);
  
      // Update the ticket with the new shared array
      const updatedTicket = await prisma.tickets.update({
        where: { id: ticketId },
        data: { shared: updatedShared },
      });
  
      res.status(200).json({
        message: 'User revoked from shared list successfully',
        ticket: updatedTicket,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to revoke user from shared list',
        error: err.message,
      });
    }
  };

//   exports.addReplyToTicket = async (req, res) => {
//     const { ticketId, detail, attachments } = req.body;
//     const userId = req.user.id; // Assuming auth middleware adds the user
  
//     try {
//       const reply = await prisma.replies.create({
//         data: {
//           ticketId,
//           userId,
//           detail,
//           attachments,
//           date: new Date(),
//         },
//       });
  
//       res.status(201).json({
//         message: 'Reply added successfully',
//         reply,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to add reply',
//         error: err.message,
//       });
//     }
//   };
// exports.addReplyToTicket = async (req, res) => {
//     const { ticketId, detail, attachments } = req.body;
//     const userId = req.user.id; // Assuming auth middleware adds the user
  
//     try {
//       const reply = await prisma.replies.create({
//         data: {
//           id: uuidv4(), // Generate a unique UUID for the reply
//           ticketId,
//           userId,
//           detail,
//           attachments: attachments || [], // Default to empty array if undefined
//           date: new Date(),
//         },
//       });
  
//       res.status(201).json({
//         message: 'Reply added successfully',
//         reply,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to add reply',
//         error: err.message,
//       });
//     }
//   };


exports.addReplyToTicket = async (req, res) => {
    const { ticketId, detail } = req.body; // No longer expecting `attachments` from body
    const userId = req.user.id; // Assuming auth middleware adds the user
  
    try {
      // Handle file uploads
      const attachments = req.files ? req.files.map((file) => file.path) : []; // Capture file paths
  
      const reply = await prisma.replies.create({
        data: {
          id: uuidv4(), // Generate a unique UUID for the reply
          ticketId,
          userId,
          detail,
          attachments, // Store uploaded file paths
          date: new Date(),
        },
      });
  
      res.status(201).json({
        message: 'Reply added successfully',
        reply,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to add reply',
        error: err.message,
      });
    }
  };

//   exports.updateReply = async (req, res) => {
//     const { replyId, detail, attachments } = req.body;
  
//     try {
//       const reply = await prisma.replies.update({
//         where: { id: replyId },
//         data: {
//           detail,
//           attachments,
//           date: new Date(), // Update the date to reflect the time of modification
//         },
//       });
  
//       res.status(200).json({
//         message: 'Reply updated successfully',
//         reply,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to update reply',
//         error: err.message,
//       });
//     }
//   };

exports.updateReply = async (req, res) => {
    const { replyId, detail } = req.body;
  
    try {
      // Fetch the current reply to get existing attachments
      const reply = await prisma.replies.findUnique({
        where: { id: replyId },
        select: {
          attachments: true, // Get current attachments
        },
      });
  
      if (!reply) {
        return res.status(404).json({ message: 'Reply not found' });
      }
  
      // Handle new attachments
      const newAttachments = req.files ? req.files.map((file) => file.path) : []; // Capture file paths
  
      // Combine existing and new attachments
      const updatedAttachments = [...reply.attachments, ...newAttachments];

      
      // Update the reply
      const updatedReply = await prisma.replies.update({
        where: { id: replyId },
        data: {
          detail,
          attachments: updatedAttachments, // Include updated attachments
          date: new Date(), // Update the date to reflect the modification time
        },
      });
  
      res.status(200).json({
        message: 'Reply updated successfully',
        reply: updatedReply,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to update reply',
        error: err.message,
      });
    }
  };

//   exports.updateTicket = async (req, res) => {
//     const { ticketId, subject, detail, department, assignedTo, attachments, shared, visibility } = req.body;
  
//     try {
//       // Fetch the current ticket to check its status
//       const ticket = await prisma.tickets.findUnique({
//         where: { id: ticketId },
//         select: { status: true }, // Fetch only the status field
//       });
  
//       if (!ticket) {
//         return res.status(404).json({ message: 'Ticket not found' });
//       }
  
//       if (ticket.status !== 'RFI') {
//         return res.status(403).json({ message: 'Ticket can only be updated when its status is RFI' });
//       }
  
//       // Update the ticket if the status is RFI
//       const updatedTicket = await prisma.tickets.update({
//         where: { id: ticketId },
//         data: {
//           subject,
//           detail,
//           department,
//           assignedTo,
//           attachments,
//           shared,
//           visibility,
//         },
//       });
  
//       res.status(200).json({
//         message: 'Ticket updated successfully',
//         ticket: updatedTicket,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to update ticket',
//         error: err.message,
//       });
//     }
//   };


// exports.updateTicket = async (req, res) => {
//     const { ticketId, subject, detail, department, assignedTo, attachments, shared, visibility } = req.body;
  
//     try {
//       // Fetch the current ticket to check its status and existing attachments
//       const ticket = await prisma.tickets.findUnique({
//         where: { id: ticketId },
//         select: {
//           status: true,
//           attachments: true, // Get current attachments
//         },
//       });
//       console.log("ASSIGNED: ",assignedTo);
      
//       if (!ticket) {
//         return res.status(404).json({ message: 'Ticket not found' });
//       }
  
//       if (ticket.status !== 'RFI') {
//         return res.status(403).json({ message: 'Ticket can only be updated when its status is RFI' });
//       }
  
//       // Handle new attachments
//       const newAttachments = req.files ? req.files.map((file) => file.path) : []; // Capture file paths
  
//       // Combine existing and new attachments
//       const updatedAttachments = [...ticket.attachments, ...newAttachments];
  
//       // Update the ticket
//       const updatedTicket = await prisma.tickets.update({
//         where: { id: ticketId },
//         data: {
//           subject,
//           detail,
//           department: Array.isArray(department) ? department : department.split(','), // Ensure department is an array
//           assignedTo: assignedTo ? assignedTo : [], // Expect array of user IDs
//           attachments: updatedAttachments, // Include updated attachments
//           shared: shared ? shared : [], // Expect array of user IDs
//           visibility,
//         },
//       });
  
//       res.status(200).json({
//         message: 'Ticket updated successfully',
//         ticket: updatedTicket,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to update ticket',
//         error: err.message,
//       });
//     }
//   };
  

// exports.updateTicket = async (req, res) => {
//     const { ticketId, subject, detail, department, visibility } = req.body;
  
//     try {
//       // Fetch the current ticket to check its status and existing fields
//       const ticket = await prisma.tickets.findUnique({
//         where: { id: ticketId },
//         select: {
//           status: true,
//           attachments: true, // Get current attachments
//           department: true, // Get current department array
//         },
//       });
  
//       if (!ticket) {
//         return res.status(404).json({ message: 'Ticket not found' });
//       }
  
//       if (ticket.status !== 'RFI') {
//         return res.status(403).json({ message: 'Ticket can only be updated when its status is RFI' });
//       }
  
//       // Handle new attachments
//       const newAttachments = req.files ? req.files.map((file) => file.path) : []; // Capture file paths
//       const updatedAttachments = [...ticket.attachments, ...newAttachments]; // Combine existing and new attachments
  
//       // Merge existing and new assignedTo, department, and shared values
//       const updatedDepartment = department ? [...new Set([...ticket.department, ...department])] : ticket.department;
  
//       // Update the ticket
//       const updatedTicket = await prisma.tickets.update({
//         where: { id: ticketId },
//         data: {
//           subject,
//           detail,
//           department: updatedDepartment, // Merge new and existing departments
//           attachments: updatedAttachments, // Include updated attachments
//         },
//       });
  
//       res.status(200).json({
//         message: 'Ticket updated successfully',
//         ticket: updatedTicket,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to update ticket',
//         error: err.message,
//       });
//     }
//   };


exports.updateTicket = async (req, res) => {
    const { ticketId, subject, detail, department, visibility } = req.body;
  
    try {
      // Fetch the current ticket to check its status and existing fields
      const ticket = await prisma.tickets.findUnique({
        where: { id: ticketId },
        select: {
          status: true,
          attachments: true, // Get current attachments
          department: true, // Get current department array
        },
      });
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      if (ticket.status !== 'RFI') {
        return res.status(403).json({ message: 'Ticket can only be updated when its status is RFI' });
      }
  
      // Handle new attachments
      const newAttachments = req.files ? req.files.map((file) => file.path) : []; // Capture file paths
      const updatedAttachments = [...ticket.attachments, ...newAttachments]; // Combine existing and new attachments
  
      // Ensure department is always an array
      const updatedDepartment = department 
        ? [...new Set([...ticket.department, ...(Array.isArray(department) ? department : department.split(',').map((d) => d.trim()))])]
        : ticket.department;
  
      // Update the ticket
      const updatedTicket = await prisma.tickets.update({
        where: { id: ticketId },
        data: {
          subject,
          detail,
          department: updatedDepartment, // Merge new and existing departments
          attachments: updatedAttachments, // Include updated attachments
          visibility,
        },
      });
  
      res.status(200).json({
        message: 'Ticket updated successfully',
        ticket: updatedTicket,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to update ticket',
        error: err.message,
      });
    }
  };
  
  


//   exports.getRepliesByTicket = async (req, res) => {
//     const { ticketId } = req.params;
  
//     try {
//       // Fetch replies for the specific ticket
//       const replies = await prisma.replies.findMany({
//         where: { ticketId: parseInt(ticketId) }, // Ensure ticketId is an integer
//         include: {
//           user: {
//             select: {
//               id: true,
//               first_name: true,
//               last_name: true,
//               email_address: true,
//             },
//           },
//         },
//         orderBy: {
//           date: 'asc', // Sort replies by date in ascending order
//         },
//       });
  
//       if (replies.length === 0) {
//         return res.status(404).json({ message: 'No replies found for this ticket' });
//       }
  
//       res.status(200).json({
//         message: 'Replies retrieved successfully',
//         replies,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to retrieve replies',
//         error: err.message,
//       });
//     }
//   };

exports.getRepliesByTicket = async (req, res) => {
    const { ticketId } = req.params;
  
    try {
      // Fetch replies for the specific ticket
      const replies = await prisma.replies.findMany({
        where: { ticketId: ticketId }, // Assuming ticketId is a string/UUID
        select: {
          id: true,
          detail: true,
          date: true,
          userId: true, // Include userId to fetch user details
        },
        orderBy: {
          date: 'asc', // Sort replies by date in ascending order
        },
      });
  
      if (replies.length === 0) {
        return res.status(404).json({ message: 'No replies found for this ticket' });
      }
  
      // Enrich replies with user info
      const enrichedReplies = await Promise.all(
        replies.map(async (reply) => {
          const user = await prisma.sec_system_user.findUnique({
            where: { id: reply.userId },
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email_address: true,
            },
          });
          return {
            ...reply,
            user, // Include user info in each reply
          };
        })
      );
  
      res.status(200).json({
        message: 'Replies retrieved successfully',
        replies: enrichedReplies,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to retrieve replies',
        error: err.message,
      });
    }
  };
  
  

//   exports.getAllTickets = async (req, res) => {
//     try {
//       // Fetch all tickets with related data
//       const tickets = await prisma.tickets.findMany({
//         include: {
//           sender: {
//             select: {
//               id: true,
//               first_name: true,
//               last_name: true,
//               email_address: true,
//             },
//           },
//           replies: {
//             select: {
//               id: true,
//               detail: true,
//               date: true,
//               user: {
//                 select: {
//                   id: true,
//                   first_name: true,
//                   last_name: true,
//                 },
//               },
//             },
//           },
//         },
//         orderBy: {
//           date: 'desc', // Sort tickets by most recent
//         },
//       });
  
//       if (tickets.length === 0) {
//         return res.status(404).json({ message: 'No tickets found' });
//       }
  
//       res.status(200).json({
//         message: 'Tickets retrieved successfully',
//         tickets,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to retrieve tickets',
//         error: err.message,
//       });
//     }
//   };

exports.getAllTickets = async (req, res) => {
    try {
      // Fetch all tickets
      const tickets = await prisma.tickets.findMany({
        include: {
          replies: {
            select: {
              id: true,
              detail: true,
              date: true,
              userId: true, // Keep userId to fetch user info later
            },
          },
        },
        orderBy: {
          date: 'desc', // Sort by most recent tickets
        },
      });
  
      // Fetch sender and user info for replies
      const enrichedTickets = await Promise.all(
        tickets.map(async (ticket) => {
          // Fetch sender information from sec_system_user
          const sender = await prisma.sec_system_user.findUnique({
            where: { id: ticket.senderId },
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email_address: true,
            },
          });
  
          // Enrich replies with user info
          const enrichedReplies = await Promise.all(
            ticket.replies.map(async (reply) => {
              const user = await prisma.sec_system_user.findUnique({
                where: { id: reply.userId },
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                },
              });
              return {
                ...reply,
                user, // Include user info in each reply
              };
            })
          );
  
          return {
            ...ticket,
            sender, // Include sender info
            replies: enrichedReplies, // Include enriched replies
          };
        })
      );
  
      if (enrichedTickets.length === 0) {
        return res.status(404).json({ message: 'No tickets found' });
      }
  
      res.status(200).json({
        message: 'Tickets retrieved successfully',
        tickets: enrichedTickets,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to retrieve tickets',
        error: err.message,
      });
    }
  };
  
  

//   exports.getTicketById = async (req, res) => {
//     const { ticketId } = req.params;
  
//     try {
//       // Fetch the ticket with related data
//       const ticket = await prisma.tickets.findUnique({
//         where: { id: parseInt(ticketId) },
//         include: {
//           sender: {
//             select: {
//               id: true,
//               first_name: true,
//               last_name: true,
//               email_address: true,
//             },
//           },
//           replies: {
//             select: {
//               id: true,
//               detail: true,
//               date: true,
//               user: {
//                 select: {
//                   id: true,
//                   first_name: true,
//                   last_name: true,
//                 },
//               },
//             },
//           },
//         },
//       });
  
//       if (!ticket) {
//         return res.status(404).json({ message: 'Ticket not found' });
//       }
  
//       res.status(200).json({
//         message: 'Ticket retrieved successfully',
//         ticket,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to retrieve ticket',
//         error: err.message,
//       });
//     }
//   };
  

exports.getTicketById = async (req, res) => {
    const { ticketId } = req.params;
  
    try {
      // Fetch the ticket by ID
      const ticket = await prisma.tickets.findUnique({
        where: { id: ticketId },
        include: {
          replies: {
            select: {
              id: true,
              detail: true,
              date: true,
              userId: true, // To fetch user info for each reply
            },
          },
        },
      });
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Fetch sender information from sec_system_user using senderId
      const sender = await prisma.sec_system_user.findUnique({
        where: { id: ticket.senderId },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email_address: true,
        },
      });
  
      // Enrich replies with user info
      const enrichedReplies = await Promise.all(
        ticket.replies.map(async (reply) => {
          const user = await prisma.sec_system_user.findUnique({
            where: { id: reply.userId },
            select: {
              id: true,
              first_name: true,
              last_name: true,
            },
          });
          return {
            ...reply,
            user, // Include user info in the reply
          };
        })
      );
  
      res.status(200).json({
        message: 'Ticket retrieved successfully',
        ticket: {
          ...ticket,
          sender, // Include sender info in the ticket
          replies: enrichedReplies, // Include enriched replies
        },
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to retrieve ticket',
        error: err.message,
      });
    }
  };
  