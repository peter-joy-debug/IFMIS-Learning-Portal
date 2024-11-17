
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Create directories if they don't exist
// const createFolder = (folder) => {
//   if (!fs.existsSync(folder)) {
//     fs.mkdirSync(folder, { recursive: true });
//   }
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let folder = 'uploads/others/';

//     const fileType = file.mimetype.split('/')[1];

//     if (/jpeg|jpg|png/.test(fileType)) {
//       folder = 'uploads/images/';
//     } else if (/pdf/.test(fileType)) {
//       folder = 'uploads/pdfs/';
//     } else if (/doc|docx/.test(fileType)) {
//       folder = 'uploads/docs/';
//     } else if (/xls/.test(fileType)) {
//       folder = 'uploads/sheets/';
//     } else if (/ppt/.test(fileType)) {
//       folder = 'uploads/presentations/';
//     }

//     createFolder(folder);
//     file.customFolder = folder; // Save the folder path to the file object
//     cb(null, folder);
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + '-' + file.originalname;
//     file.path = `${file.customFolder}/${uniqueName}`; // Use customFolder for relative path
//     cb(null, uniqueName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|xls|ppt/;
//   if (allowedTypes.test(file.mimetype)) {
//     return cb(null, true);
//   }
//   cb('Error: Unsupported file type');
// };

// module.exports = multer({ storage, fileFilter });



// const mongoose = require('mongoose');
// const multer = require('multer');
// const Grid = require('mongoose-gridfs');
// const { Readable } = require('stream');

// // MongoDB URI
// const mongoURI = 'mongodb://localhost:27017/ticket_system_files'; // Adjust to your MongoDB setup

// // Establish MongoDB connection
// const connection = mongoose.createConnection(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Initialize GridFS
// const { model: GridFSFileModel } = Grid({ collection: 'uploads', connection });

// // Multer for handling file uploads in memory
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// module.exports = {
//   upload,
//   GridFSFileModel,
//   saveFileToGridFS: async (file) => {
//     const readableStream = new Readable();
//     readableStream.push(file.buffer);
//     readableStream.push(null);

//     const fileModel = await GridFSFileModel.write(
//       { filename: file.originalname, contentType: file.mimetype },
//       readableStream
//     );

//     return fileModel;
//   },
//   getFileStream: (fileId) => {
//     return GridFSFileModel.readById(fileId);
//   },
// };


// require('dotenv').config();
// const mongoose = require('mongoose');
// const multer = require('multer');
// const { GridFSBucket } = require('mongodb');
// const { Readable } = require('stream');

// // Load MongoDB URI from .env
// const mongoURI = process.env.MONGO_URI;

// if (!mongoURI) {
//   throw new Error('MongoDB URI is not defined in .env');
// }

// // Establish MongoDB connection
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// // Initialize GridFSBucket
// let gfsBucket;
// db.once('open', () => {
//   console.log('MongoDB connection established');
//   gfsBucket = new GridFSBucket(db.db, { bucketName: 'uploads' }); // Use "uploads" as the collection
// });

// // Multer for handling file uploads in memory
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// module.exports = {
//   upload,
//   // Save file to GridFS
//   saveFileToGridFS: (file) => {
//     return new Promise((resolve, reject) => {
//       const readableStream = new Readable();
//       readableStream.push(file.buffer);
//       readableStream.push(null);

//       const uploadStream = gfsBucket.openUploadStream(file.originalname, {
//         contentType: file.mimetype,
//       });

//       readableStream.pipe(uploadStream)
//         .on('error', (err) => reject(err))
//         .on('finish', () => resolve(uploadStream.id));
//     });
//   },

//   // Retrieve file stream from GridFS
//   getFileStream: (fileId) => {
//     return gfsBucket.openDownloadStream(mongoose.Types.ObjectId(fileId));
//   },

//   // Delete file from GridFS
//   deleteFile: (fileId) => {
//     return gfsBucket.delete(mongoose.Types.ObjectId(fileId));
//   },
// };


// const multer = require('multer');
// const { Readable } = require('stream');
// const mongoose = require('mongoose');
// const { GridFSBucket } = require('mongodb');

// // MongoDB URI
// const mongoURI = process.env.MONGO_URI;

// if (!mongoURI) {
//   throw new Error('MongoDB URI is not defined in .env');
// }

// // Connect to MongoDB
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// let gfsBucket;

// db.once('open', () => {
//   console.log('MongoDB connection established');
//   gfsBucket = new GridFSBucket(db.db, { bucketName: 'uploads' });
// });

// // Multer in-memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// module.exports = {
//   gfsBucket, // Exporting the GridFSBucket instance
//   upload, // Export this for use in routes
//   saveFileToGridFS: async (file) => {
//     const readableStream = new Readable();
//     readableStream.push(file.buffer);
//     readableStream.push(null);

//     return new Promise((resolve, reject) => {
//       const uploadStream = gfsBucket.openUploadStream(file.originalname, {
//         contentType: file.mimetype,
//       });

//       readableStream
//         .pipe(uploadStream)
//         .on('error', (err) => reject(err))
//         .on('finish', () => resolve(uploadStream.id));
//     });
//   },
//   getFileStream: (fileId) => {
//     // return gfsBucket.openDownloadStream( new mongoose.Types.ObjectId(fileId));
//     return gfsBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId)); // Use 'new'
//   },
//   deleteFile: (fileId) => {
//     // return gfsBucket.delete(mongoose.Types.ObjectId(fileId));
//     return gfsBucket.delete(new mongoose.Types.ObjectId(fileId)); // Use 'new'
//   },
// };

// const multer = require('multer');
// const { Readable } = require('stream');
// const mongoose = require('mongoose');
// const { GridFSBucket } = require('mongodb');

// // MongoDB URI
// const mongoURI = process.env.MONGO_URI;

// if (!mongoURI) {
//   throw new Error('MongoDB URI is not defined in .env');
// }

// // Connect to MongoDB
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// let gfsBucket;

// db.once('open', () => {
//   console.log('MongoDB connection established');
//   gfsBucket = new GridFSBucket(db.db, { bucketName: 'uploads' });
// });

// const waitForBucket = async () => {
//   if (!gfsBucket) {
//     await new Promise((resolve) => db.once('open', resolve));
//     gfsBucket = new GridFSBucket(db.db, { bucketName: 'uploads' });
//   }
// };

// // Multer in-memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// module.exports = {
//   gfsBucket, // Exporting the GridFSBucket instance
//   waitForBucket, // Ensure GridFSBucket is ready
//   upload, // Export this for use in routes
  // saveFileToGridFS: async (file) => {
  //   await waitForBucket(); // Ensure gfsBucket is ready

  //   const readableStream = new Readable();
  //   readableStream.push(file.buffer);
  //   readableStream.push(null);

  //   return new Promise((resolve, reject) => {
  //     const uploadStream = gfsBucket.openUploadStream(file.originalname, {
  //       contentType: file.mimetype,
  //     });

  //     readableStream
  //       .pipe(uploadStream)
  //       .on('error', (err) => reject(err))
  //       .on('finish', () => resolve(uploadStream.id));
  //   });
  // },
//   getFileStream: async (fileId) => {
//     await waitForBucket(); // Ensure gfsBucket is ready
//     return gfsBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
//   },
//   deleteFile: async (fileId) => {
//     await waitForBucket(); // Ensure gfsBucket is ready
//     return gfsBucket.delete(new mongoose.Types.ObjectId(fileId));
//   },
// };


const multer = require('multer');
const { Readable } = require('stream');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { GridFSBucket } = require('mongodb');

// MongoDB URI
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error('MongoDB URI is not defined in .env');
}

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
let gfsBucket;

db.once('open', () => {
  console.log('MongoDB connection established');
  gfsBucket = new GridFSBucket(db.db, { bucketName: 'uploads' });
});

const waitForBucket = async () => {
  if (!gfsBucket) {
    await new Promise((resolve) => db.once('open', resolve));
    gfsBucket = new GridFSBucket(db.db, { bucketName: 'uploads' });
  }
};

// Multer in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = {
  upload, // Export for file uploads
  waitForBucket, // Ensure GridFSBucket is initialized
  findFile: async (fileId) => {
    await waitForBucket(); // Ensure gfsBucket is ready
    return gfsBucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();
  },
  saveFileToGridFS: async (file) => {
    await waitForBucket(); // Ensure gfsBucket is ready

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);

    return new Promise((resolve, reject) => {
      const uploadStream = gfsBucket.openUploadStream(file.originalname, {
        contentType: file.mimetype,
      });

      readableStream
        .pipe(uploadStream)
        .on('error', (err) => reject(err))
        .on('finish', () => resolve(uploadStream.id));
    });
  },
  findFilesByTypeDelete: async (fileType, fileId = null) => {
    await waitForBucket(); // Ensure gfsBucket is ready
    const query = fileId
      ? { _id: new mongoose.Types.ObjectId(fileId) }
      : fileType
      ? { contentType: { $regex: new RegExp(fileType, 'i') } }
      : {};
  
    const files = await gfsBucket.find(query).toArray();
    return files;
  },
  findFilesByType: async (fileType) => {
    await waitForBucket(); 
    const query = fileType ? { contentType: { $regex: fileType } } : {};
    return gfsBucket.find(query).toArray(); 
  },
  getFileStream: async (fileId) => {
    await waitForBucket(); // Ensure gfsBucket is ready
    return gfsBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
  },
  // deleteFile: async (fileId) => {
  //   await waitForBucket(); // Ensure gfsBucket is ready
  //   return gfsBucket.delete(new mongoose.Types.ObjectId(fileId));
  // },
  // deleteFile: async (fileId) => {
  //   await waitForBucket(); // Ensure gfsBucket is ready
  //   const fileObjectId = new ObjectId(fileId);

  //   // Ensure file exists before deletion
  //   const file = await gfsBucket.find({ _id: fileObjectId }).toArray();
  //   if (!file || file.length === 0) {
  //     throw new Error('File not found');
  //   }

  //   // Delete the file and its chunks
  //   await gfsBucket.delete(fileObjectId);

  //   console.log(`File and its chunks with ID ${fileId} deleted successfully`);
  // },
  deleteFile: async (fileId) => {
    await waitForBucket();
    const fileObjectId = new ObjectId(fileId);
  
    // Ensure the file exists
    const file = await gfsBucket.find({ _id: fileObjectId }).toArray();
    if (!file || file.length === 0) {
      throw new Error('File not found');
    }
  
    // Delete the file
    await gfsBucket.delete(fileObjectId);
  
    // Confirm that chunks are also removed
    const chunks = await db.collection('uploads.chunks').find({ files_id: fileObjectId }).toArray();
    if (chunks.length > 0) {
      console.warn(`Warning: Not all chunks deleted for file ID ${fileId}`);
    } else {
      console.log(`File and all chunks for file ID ${fileId} deleted successfully`);
    }
  },
};
