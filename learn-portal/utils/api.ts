// import axios from 'axios';

// // Create axios instance
// const api = axios.create({
//   baseURL: 'http://localhost:3100/api', // Adjust base URL as needed
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add a request interceptor to include the token in every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// // Add a response interceptor for global error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       window.location.href = '/login'; // Redirect to login if unauthorized
//     }
//     return Promise.reject(error);
//   }
// );

// // Define routes
// export const userRoutes = {
//   register: (data: any) => api.post('/users/register', data),
//   login: (data: any) => api.post('/users/login', data),
//   logout: () => api.post('/users/logout'),
//   getAllUsers: () => api.get('/users'),
//   getUserById: (id: string) => api.get(`/users/${id}`),
// };

// export const ticketRoutes = {
//   createTicket: (data: FormData) => api.post('/tickets/create', data, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   }),
//   addUserToShared: (data: any) => api.post('/tickets/addUserToShared', data),
//   addUserToAssigned: (data: any) => api.post('/tickets/addUserToAssigned', data),
//   changeStatus: (data: any) => api.post('/tickets/changeStatus', data),
//   revokeUserFromAssigned: (data: any) => api.post('/tickets/revokeUserFromAssigned', data),
//   revokeUserFromShared: (data: any) => api.post('/tickets/revokeUserFromShared', data),
//   addReply: (data: FormData) => api.post('/tickets/addReply', data, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   }),
//   updateReply: (data: FormData) => api.put('/tickets/updateReply', data, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   }),
//   updateTicket: (data: FormData) => api.put('/tickets/update', data, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   }),
//   getRepliesByTicket: (ticketId: string) => api.get(`/tickets/${ticketId}/replies`),
//   getAllTickets: () => api.get('/tickets'),
//   getTicketById: (ticketId: string) => api.get(`/tickets/${ticketId}`),
// };

// export const faqRoutes = {
//   createFAQ: (data: any) => api.post('/faqs/create', data),
//   getFAQs: () => api.get('/faqs'),
//   updateFAQ: (data: any) => api.put('/faqs/update', data),
//   deleteFAQ: (data: any) => api.delete('/faqs/delete', { data }),
// };

// export default {
//   userRoutes,
//   ticketRoutes,
//   faqRoutes,
// };

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3100/api', // Adjust this to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/authentication'; // Redirect to login if unauthorized
    }
    return Promise.reject(error);
  }
);

// User Routes
export const userRoutes = {
  register: (data: any) => api.post('/users/register', data),
  login: (data: any) => api.post('/users/login', data),
  logout: () => api.post('/users/logout'),
  getAllUsers: () => api.get('/users/'),
  getUserById: (id: string) => api.get(`/users/${id}`),
};

// Ticket Routes
export const ticketRoutes = {
  createTicket: (data: any) => api.post('/tickets/create', data),
  addUserToShared: (data: any) => api.post('/tickets/addUserToShared', data),
  addUserToAssigned: (data: any) => api.post('/tickets/addUserToAssigned', data),
  changeTicketStatus: (data: any) => api.post('/tickets/changeStatus', data),
  revokeUserFromAssigned: (data: any) => api.post('/tickets/revokeUserFromAssigned', data),
  revokeUserFromShared: (data: any) => api.post('/tickets/revokeUserFromShared', data),
  addReply: (data: any) => api.post('/tickets/addReply', data),
  updateReply: (data: any) => api.put('/tickets/updateReply', data),
  updateTicket: (data: any) => api.put('/tickets/update', data),
  getAllTickets: () => api.get('/tickets/'),
  getTicketById: (ticketId: string) => api.get(`/tickets/${ticketId}`),
  getRepliesByTicket: (ticketId: string) => api.get(`/tickets/${ticketId}/replies`),
};

// FAQ Routes
export const faqRoutes = {
  createFAQ: (data: any) => api.post('/faqs/create', data),
  getFAQs: () => api.get('/faqs/'),
  updateFAQ: (data: any) => api.put('/faqs/update', data),
  deleteFAQ: (data: any) => api.delete('/faqs/delete', { data }),
};

export default api;
