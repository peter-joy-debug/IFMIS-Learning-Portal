const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { log } = require('console');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { firstname, lastname, username, email, password, department, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.sec_system_user.create({
      data: { first_name, last_name, username, email, password: hashedPassword, department, role },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return res.status(400).send('Invalid Email or Password');

//   const validPass = await bcrypt.compare(password, user.password);
//   if (!validPass) return res.status(400).send('Invalid Email or Password');

// //   const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
// //     expiresIn: '1h',
// //   });
// const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });



//   res.header('Authorization', token).json({ token });
// };

// exports.logout = (req, res) => {
//   res.header('Authorization', '').send('Logged out');
// };

// exports.login = async (req, res) => {
//     const { user_id, password } = req.body;
  
//     try {
//       // Query sec_system_user table using username
//       const user = await prisma.secSystemUser.findUnique({
//         where: {
//           user_id: user_id, // Or use email if login is email-based
//         },
//       });
  
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       // Hash the incoming password with MD5
//       const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
  
//       // Compare hashed password
//       if (hashedPassword !== user.password) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       // Check if user is active
//       if (user.status !== 'APPROVED') {
//         return res.status(403).json({ message: 'Account is not approved or inactive' });
//       }
  
//       // Generate JWT token
//       const token = jwt.sign(
//         { id: user.id, username: user.username, position: user.position },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//       );
  
//       res.status(200).json({
//         message: 'Login successful',
//         token,
//       });
//     } catch (err) {
//       res.status(500).json({
//         message: 'An error occurred during login',
//         error: err.message,
//       });
//     }
//   };


// // Login function (already provided)
// exports.login = async (req, res) => {
//     const { user_id, password } = req.body;
  
//     try {
//         console.log("REACHED: ");
//         const user = await prisma.sec_system_user.findFirst({
//             where: {
//               user_id: user_id,
//             },
//         });
//         // console.log("USER ID: ",user.user_id);
        
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       const hashedPassword = crypto.createHash('md5').update(password).digest('hex').toUpperCase();
//     //   console.log("HASHED PASSWORD: ",hashedPassword);
      
//       if (hashedPassword !== user.password) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       if (user.status !== 'APPROVED') {
//         return res.status(403).json({ message: 'Account is not approved or inactive' });
//       }
  
//       const token = jwt.sign(
//         { id: user.id,position: user.position },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//       );
  
//       res.status(200).json({
//         message: 'Login successful',
//         token,
//       });
//     } catch (err) {
//       res.status(500).json({
//         message: 'An error occurred during login',
//         error: err.message,
//       });
//     }
//   };




// exports.login = async (req, res) => {
//     const { user_id, password } = req.body;
  
//     try {
//       const user = await prisma.sec_system_user.findFirst({
//         where: { user_id },
//       });
  
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       const hashedPassword = crypto.createHash('md5').update(password).digest('hex').toUpperCase();
  
//       if (hashedPassword !== user.password) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       if (user.status !== 'APPROVED') {
//         return res.status(403).json({ message: 'Account is not approved or inactive' });
//       }
  
//       // Generate token with both user ID and user object
//       const token = jwt.sign(
//         {
//           id: user.id,
//           user,
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//       );
  
//       res.status(200).json({
//         message: 'Login successful',
//         token,
//       });
//     } catch (err) {
//       res.status(500).json({
//         message: 'An error occurred during login',
//         error: err.message,
//       });
//     }
//   };



// exports.login = async (req, res) => {
//     const { user_id, password } = req.body;
  
//     try {
//       const user = await prisma.sec_system_user.findFirst({
//         where: { user_id },
//       });
  
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       const hashedPassword = crypto.createHash('md5').update(password).digest('hex').toUpperCase();
  
//       if (hashedPassword !== user.password) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       if (user.status !== 'APPROVED') {
//         return res.status(403).json({ message: 'Account is not approved or inactive' });
//       }
  
//       // Convert BigInt fields to string
//       const userCleaned = {
//         ...user,
//         version: user.version.toString(), // Example: BigInt fields converted to string
//       };
  
//       // Generate token with both user ID and user object
//       const token = jwt.sign(
//         {
//           id: user.id,
//           user: userCleaned, // Pass the cleaned user object
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//       );
  
//       res.status(200).json({
//         message: 'Login successful',
//         token,
//       });
//     } catch (err) {
//       res.status(500).json({
//         message: 'An error occurred during login',
//         error: err.message,
//       });
//     }
//   };


exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log("REC: ",username);
  
    try {
      const user = await prisma.sec_system_user.findFirst({
        where: { user_id:username },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      const hashedPassword = crypto.createHash('md5').update(password).digest('hex').toUpperCase();
  
      if (hashedPassword !== user.password) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      if (user.status !== 'APPROVED') {
        return res.status(403).json({ message: 'Account is not approved or inactive' });
      }
  
      // Exclude password and convert BigInt fields to string if necessary
      const { password: _, ...userWithoutPassword } = user;
      const userCleaned = Object.fromEntries(
        Object.entries(userWithoutPassword).map(([key, value]) =>
          typeof value === 'bigint' ? [key, value.toString()] : [key, value]
        )
      );
  
      // Generate token with both user ID and cleaned user object
      const token = jwt.sign(
        {
          id: user.user_id,
          user: userCleaned,
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      res.status(200).json({
        message: 'Login successful',
        token,
      });
    } catch (err) {
      res.status(500).json({
        message: 'An error occurred during login',
        error: err.message,
      });
    }
  };
  
  // Placeholder for Register
  exports.register = (req, res) => {
    res.status(501).json({ message: 'Register not implemented' });
  };
  
  // Placeholder for Logout
  exports.logout = (req, res) => {
    res.status(501).json({ message: 'Logout not implemented' });
  };







// // Get all registered users
// exports.getAllUsers = async (req, res) => {
//     try {
//         console.log("GET ALL USERS");
        
//       const users = await prisma.sec_system_user.findMany({
//         select: {
//           id: true,
//           first_name: true,
//           last_name: true,
//           email_address: true,
//           user_id: true,
//           position: true,
//           status: true,
//         },
//       });
  
//       res.status(200).json({
//         message: 'Users retrieved successfully',
//         users,
//       });
//     } catch (err) {
//       res.status(500).json({
//         message: 'Failed to retrieve users',
//         error: err.message,
//       });
//     }
//   };
  
//   // Get a user by ID
//   exports.getUserById = async (req, res) => {
//     console.log("SINGLE ID");
//     const { id } = req.params;
  
//     if (!id) {
//       return res.status(400).json({ message: 'User ID is required' });
//     }
  
//     try {
//       const user = await prisma.sec_system_user.findUnique({
//         where: { id },
//         select: {
//           id: true,
//           first_name: true,
//           last_name: true,
//           email_address: true,
//           user_id: true,
//           position: true,
//           status: true,
//         },
//       });
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       res.status(200).json({
//         message: 'User retrieved successfully',
//         user,
//       });
//     } catch (err) {
//       res.status(500).json({
//         message: 'Failed to retrieve user',
//         error: err.message,
//       });
//     }
//   };
  

exports.getAllUsers = async (req, res) => {
    try {
      const users = await prisma.sec_system_user.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email_address: true,
          user_id: true,
          position: true,
          status: true,
        },
      });
  
      res.status(200).json({
        message: 'Users retrieved successfully',
        users,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to retrieve users',
        error: err.message,
      });
    }
  };
  


  exports.getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      
      const user = await prisma.sec_system_user.findFirst({
        where: { user_id:id },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email_address: true,
          user_id: true,
          position: true,
          status: true,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'User retrieved successfully',
        user,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Failed to retrieve user',
        error: err.message,
      });
    }
  };
  