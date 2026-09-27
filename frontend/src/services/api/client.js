/**
 * Centralized API client for AVIRA.
 * Connects React frontend directly to FastAPI (/api/v1).
 * Never contains backend secrets, admin keys, or Firestore direct calls.
 */

const RAW_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'https://onest-hackathon-ws3o.onrender.com';

const RAW_API_PREFIX = import.meta.env.VITE_API_PREFIX ?? '/api/v1';

export class ApiClient {
  static getBaseUrl() {
    const base = String(RAW_BASE_URL).replace(/\/+$/, '');
    // If BASE_URL already ends with /api/v1 or /api/v1/, do not duplicate prefix
    if (base.endsWith('/api/v1')) {
      return base;
    }
    const prefix = RAW_API_PREFIX ? `/${String(RAW_API_PREFIX).replace(/^\/+|\/+$/g, '')}` : '';
    return `${base}${prefix}`;
  }

  /**
   * Store a Firebase ID token for subsequent API calls.
   */
  static setAuthToken(token) {
    if (token) {
      localStorage.setItem('netra_auth_token', token);
    } else {
      localStorage.removeItem('netra_auth_token');
    }
  }

  static getAuthToken() {
    return localStorage.getItem('netra_auth_token');
  }

  static async request(endpoint, options = {}) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.getBaseUrl()}${cleanEndpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Firebase Auth ID token
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(
          errorData.detail ||
          errorData.message ||
          `HTTP ${response.status}: ${response.statusText}`
        );
        error.status = response.status;
        throw error;
      }

      return await response.json();
    } catch (error) {
      // Log for developer debugging, return clean error
      console.warn(`[AVIRA ApiClient] Request to ${endpoint} failed:`, error.message);
      throw error;
    }
  }

  static get(endpoint, headers = {}) {
    return this.request(endpoint, { method: 'GET', headers });
  }

  static post(endpoint, body = {}, headers = {}) {
    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  }

  static put(endpoint, body = {}, headers = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
  }

  static patch(endpoint, body = {}, headers = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });
  }

  static delete(endpoint, headers = {}) {
    return this.request(endpoint, { method: 'DELETE', headers });
  }
}
