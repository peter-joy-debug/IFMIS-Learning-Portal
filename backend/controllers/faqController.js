// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const { v4: uuidv4 } = require('uuid'); // Import UUID generator


// exports.createFAQ = async (req, res) => {
//     const { question, answer } = req.body;
  
//     try {
//       const faq = await prisma.faqs.create({
//         data: {
//           id: uuidv4(), // Generate a unique ID manually
//           question,
//           answer,
//         },
//       });
  
//       res.status(201).json({
//         message: 'FAQ created successfully',
//         faq,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: 'Failed to create FAQ',
//         error: err.message,
//       });
//     }
//   };

// exports.getFAQs = async (req, res) => {
//   try {
//     const faqs = await prisma.faqs.findMany();

//     res.status(200).json({
//       message: 'FAQs retrieved successfully',
//       faqs,
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: 'Failed to retrieve FAQs',
//       error: err.message,
//     });
//   }
// };

// exports.updateFAQ = async (req, res) => {
//   const { id, question, answer } = req.body;

//   try {
//     const faq = await prisma.faqs.update({
//       where: { id },
//       data: { question, answer },
//     });

//     res.status(200).json({
//       message: 'FAQ updated successfully',
//       faq,
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: 'Failed to update FAQ',
//       error: err.message,
//     });
//   }
// };

// exports.deleteFAQ = async (req, res) => {
//   const { id } = req.body;

//   try {
//     await prisma.faqs.delete({
//       where: { id },
//     });

//     res.status(200).json({
//       message: 'FAQ deleted successfully',
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: 'Failed to delete FAQ',
//       error: err.message,
//     });
//   }
// };


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid'); // Import UUID generator

// Create FAQ
exports.createFAQ = async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({
      message: 'Question and Answer are required',
    });
  }

  try {
    const faq = await prisma.faqs.create({
      data: {
        id: uuidv4(), // Generate a unique ID
        question,
        answer,
      },
    });

    res.status(201).json({
      message: 'FAQ created successfully',
      faq,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed to create FAQ',
      error: err.message,
    });
  }
};

// Get all FAQs
exports.getFAQs = async (req, res) => {
  try {
    const faqs = await prisma.faqs.findMany();

    res.status(200).json({
      message: 'FAQs retrieved successfully',
      faqs,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed to retrieve FAQs',
      error: err.message,
    });
  }
};

// Update FAQ
exports.updateFAQ = async (req, res) => {
  const { id, question, answer } = req.body;

  if (!id) {
    return res.status(400).json({
      message: 'FAQ ID is required',
    });
  }

  if (!question || !answer) {
    return res.status(400).json({
      message: 'Question and Answer are required',
    });
  }

  try {
    const faq = await prisma.faqs.update({
      where: { id },
      data: { question, answer },
    });

    res.status(200).json({
      message: 'FAQ updated successfully',
      faq,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed to update FAQ',
      error: err.message,
    });
  }
};

// Delete FAQ
exports.deleteFAQ = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message: 'FAQ ID is required',
    });
  }

  try {
    await prisma.faqs.delete({
      where: { id },
    });

    res.status(200).json({
      message: 'FAQ deleted successfully',
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed to delete FAQ',
      error: err.message,
    });
  }
};
