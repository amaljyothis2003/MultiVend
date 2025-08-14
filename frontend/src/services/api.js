// Centralized API base URLs
// Configure via Vite env variables
export const PRODUCT_API_BASE = import.meta.env.VITE_PRODUCT_API_URL || 'http://localhost:3002';
export const USER_API_BASE = import.meta.env.VITE_USER_API_URL || 'http://localhost:3001';
export const ORDER_API_BASE = import.meta.env.VITE_ORDER_API_URL || 'http://localhost:3003';

export async function fetchJSON(path, init, baseUrl = PRODUCT_API_BASE) {
  const res = await fetch(`${baseUrl}${path}`, init);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed: ${res.status} ${res.statusText} ${text}`.trim());
  }
  return res.json();
}

// Helper function for authenticated requests
export async function fetchWithAuth(path, options = {}, baseUrl = PRODUCT_API_BASE) {
  const token = localStorage.getItem('token');
  return fetchJSON(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }, baseUrl);
}

// Product-specific API functions
export const productAPI = {
  // Get all products
  getAll: () => fetchJSON('/products'),
  
  // Get single product
  getById: (id) => fetchJSON(`/products/${id}`),
  
  // Create new product (requires auth)
  create: (productData) => fetchWithAuth('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  
  // Update product (requires auth)
  update: (id, productData) => fetchWithAuth(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  
  // Delete product (requires auth)
  delete: (id) => fetchWithAuth(`/products/${id}`, {
    method: 'DELETE',
  }),
};

// Order-specific API functions
export const orderAPI = {
  // Get all orders for the authenticated user
  getAll: () => fetchWithAuth('/orders', {}, ORDER_API_BASE),
  
  // Get single order
  getById: (id) => fetchWithAuth(`/orders/${id}`, {}, ORDER_API_BASE),
  
  // Create new order (requires auth)
  create: (orderData) => fetchWithAuth('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }, ORDER_API_BASE),
  
  // Process payment for an order
  processPayment: (id, paymentData) => fetchWithAuth(`/orders/${id}/payment`, {
    method: 'POST',
    body: JSON.stringify(paymentData),
  }, ORDER_API_BASE),
  
  // Cancel order
  cancel: (id) => fetchWithAuth(`/orders/${id}/cancel`, {
    method: 'PUT',
  }, ORDER_API_BASE),
  
  // Update order status (for admin/seller use)
  updateStatus: (id, status) => fetchWithAuth(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }, ORDER_API_BASE),
};
