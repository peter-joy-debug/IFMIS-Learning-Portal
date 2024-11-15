

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
//     let folder = 'uploads/others/'; // Default folder for unsupported types

//     const fileType = file.mimetype.split('/')[1]; // Extract file type from mimetype

//     if (/jpeg|jpg|png/.test(fileType)) {
//       folder = 'uploads/images/';
//     } else if (/pdf/.test(fileType)) {
//       folder = 'uploads/pdfs/';
//     } else if (/doc|docx/.test(fileType)) {
//       folder = 'uploads/docs/';
//     } else if (/xls/.test(fileType)) {
//       folder = 'uploads/sheets/';
//     } else if (/ppt|pptx/.test(fileType)) {
//       folder = 'uploads/presentations/';
//     }

//     // Ensure the folder exists
//     createFolder(folder);
//     cb(null, folder);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|xls|ppt/;
//   const extName = allowedTypes.test(file.mimetype);
//   if (extName) {
//     return cb(null, true);
//   }
//   cb('Error: File type not supported');
// };

// module.exports = multer({ storage, fileFilter });


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
//     cb(null, folder);
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + '-' + file.originalname;
//     file.path = `/uploads/${file.destination.split('/')[1]}/${uniqueName}`; // Store the relative path in the file object
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


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create directories if they don't exist
const createFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = 'uploads/others/';

    const fileType = file.mimetype.split('/')[1];

    if (/jpeg|jpg|png/.test(fileType)) {
      folder = 'uploads/images/';
    } else if (/pdf/.test(fileType)) {
      folder = 'uploads/pdfs/';
    } else if (/doc|docx/.test(fileType)) {
      folder = 'uploads/docs/';
    } else if (/xls/.test(fileType)) {
      folder = 'uploads/sheets/';
    } else if (/ppt/.test(fileType)) {
      folder = 'uploads/presentations/';
    }

    createFolder(folder);
    file.customFolder = folder; // Save the folder path to the file object
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    file.path = `${file.customFolder}/${uniqueName}`; // Use customFolder for relative path
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|xls|ppt/;
  if (allowedTypes.test(file.mimetype)) {
    return cb(null, true);
  }
  cb('Error: Unsupported file type');
};

module.exports = multer({ storage, fileFilter });
