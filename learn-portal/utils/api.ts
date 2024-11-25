

import axios from 'axios';
import { env } from 'process';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Adjust this to your backend URL
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
  logout: () => api.post('/users/logout', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
  getAllUsers: () => api.get('/users/', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
  getUserById: (id: string) => api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
};



// Ticket Routes
export const ticketRoutes = {
  createTicket: (data: FormData) =>
    api.post('/tickets/create', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
      },
    }),
    getTicketsByUser: () =>
      api.get('/tickets/user',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
        },
      }),
    addReply: (data: FormData) =>
      api.post('/tickets/addReply', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
        },
      }),
    updateReply: (data: FormData) =>
        api.put('/tickets/updateReply', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
          },
      }),
      updateTicket: (data: FormData) =>
        api.put('/tickets/update', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
          },
    }),
  addUserToShared: (data: any) => api.post('/tickets/addUserToShared', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
  addUserToAssigned: (data: any) => api.post('/tickets/addUserToAssigned', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
  changeTicketStatus: (data: any) => api.post('/tickets/changeStatus', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
  revokeUserFromAssigned: (data: any) => api.post('/tickets/revokeUserFromAssigned', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
  revokeUserFromShared: (data: any) => api.post('/tickets/revokeUserFromShared', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
  // addReply: (data: any) => api.post('/tickets/addReply', data),
  // updateReply: (data: any) => api.put('/tickets/updateReply', data),
  // updateTicket: (data: any) => api.put('/tickets/update', data),
  getAllTickets: () => api.get('/tickets/', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
  getTicketById: (ticketId: string) => api.get(`/tickets/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
  getRepliesByTicket: (ticketId: string) => api.get(`/tickets/${ticketId}/replies`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
getFileById: (fileId: string) => api.get(`/tickets/files/${fileId}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
  },
}),
};


// FAQ Routes
export const faqRoutes = {
  createFAQ: (data: any) => api.post('/faqs/create', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
  getFAQs: () => api.get('/faqs/'),
  updateFAQ: (data: any) => api.put('/faqs/update', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
}),
  deleteFAQ: (data: any) => api.delete('/faqs/delete', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the header
    },
 } ),
};

export default api;
