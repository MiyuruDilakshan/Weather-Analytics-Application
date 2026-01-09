import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              Weather Analytics
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-white text-sm">
                  <span className="font-medium">{user?.name || user?.email}</span>
                </div>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
