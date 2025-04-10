/**
 * Get the authentication token from local storage
 * @returns {string | null} The token or null if not found
 */
export const getToken = (): string | null => {
    return localStorage.getItem('token');
  };
  
  /**
   * Check if the user is authenticated
   * @returns {boolean} True if authenticated, false otherwise
   */
  export const isAuthenticated = (): boolean => {
    return !!getToken();
  };
  
  /**
   * Parse JWT token to get user info
   * @param {string} token - JWT token
   * @returns {any} Decoded token payload
   */
  export const parseToken = (token: string): any => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  };