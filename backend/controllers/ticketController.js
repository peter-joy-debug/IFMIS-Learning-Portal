const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid'); // Import the UUID generator
const { saveFileToGridFS, getFileStream, deleteFile, waitForBucket,findFile, findFilesByType, findFilesByTypeDelete } = require('../middleware/upload');
const mongoose = require('mongoose'); // Add this line


// Create Ticket with File Upload
exports.createTicket = async (req, res) => {
  const { subject, detail, department } = req.body;
  const userID = req.user.id;

  try {
    const userExists = await prisma.sec_system_user.findFirst({
      where: { user_id: userID },
    });

    if (!userExists) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const attachments = [];
    if (req.files) {
      for (const file of req.files) {
        const fileId = await saveFileToGridFS(file);
        attachments.push(fileId);
      }
    }

    const ticket = await prisma.tickets.create({
      data: {
        id: uuidv4(),
        senderId: userID,
        subject,
        detail,
        department: Array.isArray(department) ? department : department.split(','),
        attachments,
      },
    });

    res.status(201).json({ message: 'Ticket created successfully', ticket });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create ticket', error: err.message });
  }
};


exports.getFile = async (req, res) => {
  try {
    // console.log("REACHED 1");

    const fileId = req.params.fileId;
    // console.log("FILE ID: ", fileId);

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: 'Invalid file ID' });
    }

    const files = await findFile(fileId);

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileMeta = files[0];
    const fileStream = await getFileStream(fileId);

    const buffer = [];
    fileStream.on('data', (chunk) => buffer.push(chunk));
    fileStream.on('end', () => {
      const base64Data = Buffer.concat(buffer).toString('base64');
      res.status(200).json({
        filename: fileMeta.filename,
        contentType: fileMeta.contentType,
        base64Data, // Send the file as a base64-encoded string
      });
    });

    fileStream.on('error', (error) => {
      console.error('Stream error:', error);
      res.status(500).json({ message: 'Error reading file stream' });
    });

  } catch (err) {
    console.error('Error retrieving file:', err);
    res.status(500).json({ message: 'Failed to retrieve file' });
  }
};



exports.getAllFiles = async (req, res) => {
  try {
    const { fileType } = req.query; // Retrieve fileType from query params
    const files = await findFilesByType(fileType); 

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No files found' });
    }

    const fileList = files.map((file) => ({
      id: file._id,
      filename: file.filename,
      contentType: file.contentType,
      uploadDate: file.uploadDate,
    }));

    res.status(200).json({
      message: 'Files retrieved successfully',
      files: fileList,
    });
  } catch (err) {
    console.error('Error retrieving files:', err);
    res.status(500).json({ message: 'Failed to retrieve files' });
  }
};




exports.deleteFiles = async (req, res) => {
  try {
    const { fileType } = req.query; // Get fileType from query params
    const files = await findFilesByTypeDelete(fileType); // Get files based on type or all if no type

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No files found' });
    }

    for (const file of files) {
      // Delete the file from GridFS
      await deleteFile(file._id);

      // Remove the file references from tickets
      const ticketsToUpdate = await prisma.tickets.findMany({
        where: { attachments: { has: file._id.toString() } },
      });

      for (const ticket of ticketsToUpdate) {
        const updatedAttachments = ticket.attachments.filter((id) => id !== file._id.toString());
        await prisma.tickets.update({
          where: { id: ticket.id },
          data: { attachments: { set: updatedAttachments } },
        });
      }

      // Remove the file references from replies
      const repliesToUpdate = await prisma.replies.findMany({
        where: { attachments: { has: file._id.toString() } },
      });

      for (const reply of repliesToUpdate) {
        const updatedAttachments = reply.attachments.filter((id) => id !== file._id.toString());
        await prisma.replies.update({
          where: { id: reply.id },
          data: { attachments: { set: updatedAttachments } },
        });
      }
    }

    res.status(200).json({ message: `Deleted ${files.length} files successfully` });
  } catch (err) {
    console.error('Error deleting files:', err);
    res.status(500).json({ message: 'Failed to delete files' });
  }
};


exports.deleteFileById = async (req, res) => {
  try {
    const { fileId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: 'Invalid file ID' });
    }

    // Check if the file exists
    const file = await findFile(fileId);

    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Proceed with deletion
    await deleteFile(fileId);

// Update tickets to remove the specific fileId
const ticketsToUpdate = await prisma.tickets.findMany({
  where: { attachments: { has: fileId } },
});

for (const ticket of ticketsToUpdate) {
  const updatedAttachments = ticket.attachments.filter((id) => id !== fileId);
  await prisma.tickets.update({
    where: { id: ticket.id },
    data: { attachments: { set: updatedAttachments } }, // Use set with the updated array
  });
}

// Update replies to remove the specific fileId
const repliesToUpdate = await prisma.replies.findMany({
  where: { attachments: { has: fileId } },
});

for (const reply of repliesToUpdate) {
  const updatedAttachments = reply.attachments.filter((id) => id !== fileId);
  await prisma.replies.update({
    where: { id: reply.id },
    data: { attachments: { set: updatedAttachments } }, // Use set with the updated array
  });
}

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error('Error deleting file:', err);
    res.status(500).json({ message: 'Failed to delete file' });
  }
};


// exports.addUserToShared = async (req, res) => {
//   // console.log("REACHED...");
 
//   try {
//     if (!prisma) {
//       throw new Error('Prisma client not initialized');
//     }

//     const { ticketId, userId } = req.body;
//     const requesterId = req.user?.id;

//     if (!ticketId || !userId) {
//       return res.status(400).json({ message: 'Ticket ID and User ID are required' });
//     }

//     const ticket = await prisma.tickets.findUnique({
//       where: { id: ticketId },
//       select: { shared: true, senderId: true },
//     });

//     if (!ticket) {
//       return res.status(404).json({ message: 'Ticket not found' });
//     }

//     if (ticket.senderId === userId) {
//       return res.status(400).json({ message: "Owner can't assign themselves to shared" });
//     }

//     if (ticket.shared.includes(userId)) {
//       return res.status(400).json({ message: 'User is already assigned to this ticket' });
//     }

//     const updatedTicket = await prisma.tickets.update({
//       where: { id: ticketId },
//       data: {
//         shared: {
//           push: userId,
//         },
//       },
//     });

//     res.status(200).json({
//       message: 'User assigned to ticket successfully',
//       ticket: updatedTicket,
//     });
//   } catch (err) {
//     console.error('Error in addUserToShared:', err);
//     res.status(400).json({
//       message: 'Failed to assign user to ticket',
//       error: err.message,
//     });
//   }
// };
  
exports.addUserToShared = async (req, res) => {
  try {
    if (!prisma) {
      throw new Error('Prisma client not initialized');
    }
    const { ticketId, userId } = req.body; // Expect userIds to be an array
    const requesterId = req.user?.id;
    // console.log("Data: ",userId);
    
    if (!ticketId || !userId) {
      return res.status(400).json({ message: 'Ticket ID and an array of User IDs are required' });
    }

    const ticket = await prisma.tickets.findUnique({
      where: { id: ticketId },
      select: { shared: true, senderId: true },
    });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Filter out invalid users (owner and already shared)
    const validUserIds = userId.filter((userId) => {
      if (userId === ticket.senderId) {
        console.warn(`Skipping owner userId: ${userId}`);
        return false;
      }
      if (ticket.shared.includes(userId)) {
        console.warn(`Skipping already shared userId: ${userId}`);
        return false;
      }
      return true;
    });

    if (validUserIds.length === 0) {
      return res.status(400).json({ message: 'No valid users to add to shared list' });
    }

    // Push each valid user ID one by one
    for (const userId of validUserIds) {
      await prisma.tickets.update({
        where: { id: ticketId },
        data: {
          shared: {
            push: userId,
          },
        },
      });
    }

    // Fetch the updated ticket
    const updatedTicket = await prisma.tickets.findUnique({
      where: { id: ticketId },
      select: { shared: true },
    });

    res.status(200).json({
      message: 'Users added to shared list successfully',
      ticket: updatedTicket,
    });
  } catch (err) {
    console.error('Error in addUserToShared:', err);
    res.status(400).json({
      message: 'Failed to add users to shared list',
      error: err.message,
    });
  }
};

  



  
// exports.addUserToAssigned = async (req, res) => {
//   // console.log("test 002");

//   try {
//     if (!prisma) {
//       throw new Error('Prisma client not initialized');
//     }

//     const { ticketId, userId } = req.body;
//     const requesterId = req.user?.id;

//     if (!ticketId || !userId) {
//       return res.status(400).json({ message: 'Ticket ID and User ID are required' });
//     }

//     const ticket = await prisma.tickets.findUnique({
//       where: { id: ticketId },
//       select: { assignedTo: true, senderId: true },
//     });

//     if (!ticket) {
//       return res.status(404).json({ message: 'Ticket not found' });
//     }

//     if (ticket.senderId === userId) {
//       return res.status(400).json({ message: "Owner can't assign themselves" });
//     }

//     if (ticket.assignedTo.includes(userId)) {
//       return res.status(400).json({ message: 'User is already assigned to this ticket' });
//     }

//     const updatedTicket = await prisma.tickets.update({
//       where: { id: ticketId },
//       data: {
//         assignedTo: {
//           push: userId,
//         },
//       },
//     });

//     res.status(200).json({
//       message: 'User assigned to ticket successfully',
//       ticket: updatedTicket,
//     });
//   } catch (err) {
//     console.error('Error in addUserToAssigned:', err);
//     res.status(400).json({
//       message: 'Failed to assign user to ticket',
//       error: err.message,
//     });
//   }
// };


// exports.addUserToAssigned = async (req, res) => {
//   try {
//     if (!prisma) {
//       throw new Error('Prisma client not initialized');
//     }

//     const { ticketId, userIds } = req.body; // Expect userIds to be an array
//     const requesterId = req.user?.id;

//     if (!ticketId || !userIds || !Array.isArray(userIds)) {
//       return res.status(400).json({ message: 'Ticket ID and an array of User IDs are required' });
//     }

//     const ticket = await prisma.tickets.findUnique({
//       where: { id: ticketId },
//       select: { assignedTo: true, senderId: true },
//     });

//     if (!ticket) {
//       return res.status(404).json({ message: 'Ticket not found' });
//     }

//     // Filter out any users who are already in assignedTo or are the ticket owner
//     const validUserIds = userIds.filter((userId) => {
//       if (userId === ticket.senderId) {
//         console.warn(`Skipping owner userId: ${userId}`);
//         return false;
//       }
//       if (ticket.assignedTo.includes(userId)) {
//         console.warn(`Skipping already assigned userId: ${userId}`);
//         return false;
//       }
//       return true;
//     });

//     if (validUserIds.length === 0) {
//       return res.status(400).json({ message: 'No valid users to assign to this ticket' });
//     }

//     const updatedTicket = await prisma.tickets.update({
//       where: { id: ticketId },
//       data: {
//         assignedTo: {
//           push: validUserIds, // Push the array of valid userIds
//         },
//       },
//     });

//     res.status(200).json({
//       message: 'Users assigned to ticket successfully',
//       ticket: updatedTicket,
//     });
//   } catch (err) {
//     console.error('Error in addUserToAssigned:', err);
//     res.status(400).json({
//       message: 'Failed to assign users to ticket',
//       error: err.message,
//     });
//   }
// };

exports.addUserToAssigned = async (req, res) => {
  try {
    if (!prisma) {
      throw new Error('Prisma client not initialized');
    }

    const { ticketId, userId } = req.body; // Expect userIds to be an array
    const requesterId = req.user?.id;

    if (!ticketId || !userId) {
      return res.status(400).json({ message: 'Ticket ID and an array of User IDs are required' });
    }

    const ticket = await prisma.tickets.findUnique({
      where: { id: ticketId },
      select: { assignedTo: true, senderId: true },
    });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Filter out invalid users (owner and already assigned)
    const validUserIds = userId.filter((userId) => {
      if (userId === ticket.senderId) {
        console.warn(`Skipping owner userId: ${userId}`);
        return false;
      }
      if (ticket.assignedTo.includes(userId)) {
        console.warn(`Skipping already assigned userId: ${userId}`);
        return false;
      }
      return true;
    });

    if (validUserIds.length === 0) {
      return res.status(400).json({ message: 'No valid users to add to assigned list' });
    }

    // Push each valid user ID one by one
    for (const userId of validUserIds) {
      await prisma.tickets.update({
        where: { id: ticketId },
        data: {
          assignedTo: {
            push: userId,
          },
        },
      });
    }

    // Fetch the updated ticket
    const updatedTicket = await prisma.tickets.findUnique({
      where: { id: ticketId },
      select: { assignedTo: true },
    });

    res.status(200).json({
      message: 'Users added to assigned list successfully',
      ticket: updatedTicket,
    });
  } catch (err) {
    console.error('Error in addUserToAssigned:', err);
    res.status(400).json({
      message: 'Failed to add users to assigned list',
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
  console.log("BODY", req.body);
  
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
  console.log("Reached: ---");

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
    const updatedShared = ticket.shared.filter((id) => id !== userId);

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




exports.addReplyToTicket = async (req, res) => {
  const { ticketId, detail } = req.body;
  const userId = req.user.id;

  try {
    const attachments = [];
    if (req.files) {
      for (const file of req.files) {
        const savedFile = await saveFileToGridFS(file);
        attachments.push(savedFile._id);
      }
    }

    const reply = await prisma.replies.create({
      data: {
        id: uuidv4(),
        ticketId,
        userId,
        detail,
        attachments, // Store attachment IDs
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




exports.updateReply = async (req, res) => {
  const { replyId, detail } = req.body;

  try {
    const reply = await prisma.replies.findUnique({
      where: { id: replyId },
      select: { attachments: true },
    });

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    const newAttachments = [];
    if (req.files) {
      for (const file of req.files) {
        const savedFile = await saveFileToGridFS(file);
        newAttachments.push(savedFile._id);
      }
    }

    const updatedReply = await prisma.replies.update({
      where: { id: replyId },
      data: {
        detail,
        attachments: [...reply.attachments, ...newAttachments],
        date: new Date(),
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

    // Handle new attachments and save them to GridFS
    const newAttachments = [];
    if (req.files) {
      for (const file of req.files) {
        const savedFile = await saveFileToGridFS(file);
        newAttachments.push(savedFile._id); // Store attachment IDs in the ticket
      }
    }

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
    console.error('Error updating ticket:', err); // Log error for debugging
    res.status(400).json({
      message: 'Failed to update ticket',
      error: err.message,
    });
  }
};
  

exports.getRepliesByTicket = async (req, res) => {
    const { ticketId } = req.params;
    // console.log("REACHED TEST");
    
    try {
      // Fetch replies for the specific ticket
      const replies = await prisma.replies.findMany({
        where: { ticketId: ticketId }, // Assuming ticketId is a string/UUID
        select: {
          id: true,
          detail: true,
          date: true,
          attachments:true,
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
          const user = await prisma.sec_system_user.findFirst({
            where: { user_id: reply.userId },
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
          const sender = await prisma.sec_system_user.findFirst({
            where: { user_id: ticket.senderId },
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
              const user = await prisma.sec_system_user.findFirst({
                where: { user_id: reply.userId },
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
      const sender = await prisma.sec_system_user.findFirst({
        where: { user_id: ticket.senderId },
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
          const user = await prisma.sec_system_user.findFirst({
            where: { user_id: reply.userId },
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
  


exports.getTicketsByUser = async (req, res) => {
  try {
    // console.log("Pre-Unlock");

    const userId = req.user?.id || "MissingUserId";
    // console.log("User ID from middleware:", userId);

    const tickets = await prisma.tickets.findMany({
      where: {
        OR: [
          { senderId: userId },
          { shared: { has: userId } },
          { assignedTo: { has: userId } },
        ],
      },
    });

    // console.log("Retrieved Tickets:", tickets);

    if (!tickets.length) {
      return res.status(404).json({ message: 'No tickets found for this user.' });
    }

    res.status(200).json({ tickets });
  } catch (error) {
    console.error('Error retrieving tickets:', error);
    res.status(500).json({ message: 'Failed to retrieve tickets.' });
  }
};
