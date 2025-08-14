import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  useEffect(() => {
    const verifyToken = async (authToken) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_USER_API_URL || 'http://localhost:3001'}/users/profile`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const userProfile = await response.json();
          setUser(userProfile);
          setToken(authToken);
        } else {
          // Token is invalid, clear it
          logout();
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    // Check for existing token in localStorage
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      // Verify token is still valid by checking profile
      verifyToken(savedToken);
    } else {
      setLoading(false);
    }
  }, []);


  // Enhanced login to support admin login (frontend only)
  const login = (userData, authToken, password) => {
    // If admin credentials match, treat as admin
    if (
      userData?.email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      const adminUser = { ...userData, role: 'admin' };
      setUser(adminUser);
      setToken(authToken);
      localStorage.setItem('user', JSON.stringify(adminUser));
      localStorage.setItem('token', authToken);
    } else {
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', authToken);
    }
  };


  // Update user profile and role (frontend only)
  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };


  // Determine role: admin, seller, buyer
  let role = 'buyer';
  if (user?.role === 'admin' || user?.email === ADMIN_EMAIL) {
    role = 'admin';
  } else if (user?.isSeller || user?.role === 'seller') {
    role = 'seller';
  }

  const value = {
    user,
    token,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
    role
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
