import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authAPI = {
  verifyPhone: (phone_number: string) =>
    api.post('/api/verify/', { phone_number }),

  loginRegister: (data: {
    name: string;
    phone_number: string;
    unique_id?: string;
  }) => api.post('/api/login-register/', data),

  getUserOrders: () => api.get('/api/user-orders/'),
};

export const productAPI = {
  getNewProducts: () => api.get('/api/new-products/'),
  
  purchaseProduct: (data: {
    product_id?: string;
    variation_product_id?: number;
  }) => api.post('/api/purchase-product/', data),
};

export default api;