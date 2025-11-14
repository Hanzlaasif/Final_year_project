import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BarChart3, Package, Settings, LogOut } from "lucide-react";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/a-login");
  };

  return (
    <div>
      {/* Sidebar */}
      <aside className="w-64 h-full bg-black text-yellow-400 flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-8 text-center text-yellow-300">
          Admin Panel
        </h1>

        <nav className="flex flex-col space-y-3">
          <NavLink
            to="/a-dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:text-yellow-200 ${
                isActive ? "bg-yellow-500 text-black" : ""
              }`
            }
          >
            <BarChart3 /> <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/a-orders"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:text-yellow-200 ${
                isActive ? "bg-yellow-500 text-black" : ""
              }`
            }
          >
            <Package /> <span>Orders</span>
          </NavLink>

          <NavLink
            to="/a-settings"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:text-yellow-200 ${
                isActive ? "bg-yellow-500 text-black" : ""
              }`
            }
          >
            <Settings /> <span>Settings</span>
          </NavLink>
        </nav>

        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-300"
          >
            <LogOut className="mr-2" /> Logout
          </button>
        </div>
      </aside>

    
    </div>
  );
};

export default AdminPanel;
