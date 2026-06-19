// Admin authentication utilities
const ADMIN_USERNAME = 'showyoo';
const ADMIN_PASSWORD = 'Showyoo123#';
const AUTH_TOKEN_KEY = 'admin_auth_token';

// Simple token generation (for client-side only)
const generateToken = (): string => {
  return btoa(`${ADMIN_USERNAME}:${Date.now()}`);
};

export const login = (username: string, password: string): boolean => {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = generateToken();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
      sessionStorage.setItem('admin_username', username);
    }
    return true;
  }
  return false;
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem('admin_username');
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!sessionStorage.getItem(AUTH_TOKEN_KEY);
};

export const getAdminUsername = (): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('admin_username');
};
