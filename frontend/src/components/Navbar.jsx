import { useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <header className="border-b fixed w-full top-0 z-40 backdrop-blur-lg bg-white/50 shadow-lg">
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <img src="/src/assets/logo2.svg" alt="Logo" className="w-32 m-3 text-primary" />
            </div>
            <div className="flex items-center gap-5">
              <Link to="/settings" className="h-6 w-6 flex items-center">
                <Settings className="h-6 w-6" />
              </Link>

              {authUser && (
                <>
                  <Link to="/profile" className="h-6 w-6 flex items-center">
                    <User className="h-6 w-6" />
                  </Link>

                  <button
                    className="flex gap-2 items-center"
                    onClick={handleLogoutClick}
                    aria-label="Logout"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
