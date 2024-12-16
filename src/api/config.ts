import axios from 'axios';

/**
 * Extract CSRF token from cookies
 */
function getCSRFToken(): string | null {
  const csrfToken = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('csrftoken='));
  return csrfToken ? csrfToken.split('=')[1] : null;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

apiClient.interceptors.request.use((config) => {
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken; 
  }
  return config;
});

export default apiClient;
