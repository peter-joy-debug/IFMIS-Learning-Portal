
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
