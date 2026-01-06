import { jwtDecode } from 'jwt-decode';

export interface TokenPayload {
  user_id: string;
  name: string;
  phone_number: string;
  exp: number;
}

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload) return true;
  
  return Date.now() >= payload.exp * 1000;
};

export const storeAuthData = (
  token: string,
  user: { id: string; name: string; phone_number: string }
) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('auth-user', JSON.stringify(user));
  }
};

export const clearAuthData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
  }
};