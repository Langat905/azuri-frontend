const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function
const request = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${API}${endpoint}`, options);
  return res.json();
};

// Auth
export const registerUser = (data) => request('/api/auth/register', 'POST', data);
export const loginUser = (data) => request('/api/auth/login', 'POST', data);

// Bookings
export const getBookings = (token) => request('/api/bookings', 'GET', null, token);
export const createBooking = (data, token) => request('/api/bookings', 'POST', data, token);
export const updateBooking = (id, data, token) => request(`/api/bookings/${id}`, 'PUT', data, token);
export const deleteBooking = (id, token) => request(`/api/bookings/${id}`, 'DELETE', null, token);

// Payments
export const createPaymentIntent = (data, token) => request('/api/payments/create-intent', 'POST', data, token);
export const confirmPayment = (data, token) => request('/api/payments/confirm', 'POST', data, token);

// Notifications
export const sendEmail = (data, token) => request('/api/notifications/email', 'POST', data, token);
export const sendReminder = (data, token) => request('/api/notifications/booking-reminder', 'POST', data, token);
  