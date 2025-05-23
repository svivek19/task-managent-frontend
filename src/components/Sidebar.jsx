import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/userSlice";
import { toast } from "sonner";
import { Modal } from "antd";
import { clearTasks } from "../redux/features/taskSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [menuItems, setMenuItems] = useState([]);

  const adminSideItems = [
    {
      path: "/admin/dashboard",
      icon: "fluent-color:calendar-data-bar-24",
      title: "Dashboard",
    },
    {
      path: "/admin/manage-task",
      icon: "fluent-color:people-team-24",
      title: "Manage Tasks",
    },
    {
      path: "/admin/create-task",
      icon: "fluent-color:design-ideas-24",
      title: "Create Task",
    },
    {
      path: "/admin/team-members",
      icon: "fluent-color:people-community-24",
      title: "Team",
    },
  ];

  const employeeSideItems = [
    {
      path: "/employee/dashboard",
      icon: "fluent-color:apps-list-detail-24",
      title: "Overview",
    },
    {
      path: "/employee/manage-task",
      icon: "fluent-color:bot-sparkle-24",
      title: "Tasks",
    },
  ];

  useEffect(() => {
    if (!user) {
      setMenuItems([]);
      return;
    }

    if (user.role === "employee") {
      setMenuItems([...employeeSideItems]);
    } else if (user.role === "admin") {
      setMenuItems([...adminSideItems]);
    } else {
      setMenuItems([]);
    }

    if (
      user.role === "employee" &&
      window.location.pathname.includes("/admin")
    ) {
      navigate("/employee/dashboard");
    } else if (
      user.role === "admin" &&
      window.location.pathname.includes("/employee")
    ) {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        dispatch(clearTasks());
        dispatch(logout());
        toast.info("Session ended successfully.");
        navigate("/");
      },
    });
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="hidden md:flex w-60 h-screen bg-white shadow-md flex-col justify-between">
        <div>
          <h1 className="cursor-pointer text-center text-2xl font-bold py-6 border-b relative group">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent transition duration-300 group-hover:scale-105 inline-block">
              TaskFlow
            </span>
            <Icon
              icon="fluent-emoji:rocket"
              className="inline-block ml-2 text-xl transition-transform duration-300 group-hover:rotate-12"
            />
          </h1>

          <nav className="flex flex-col p-4 gap-2">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-800 border-blue-800 border-r-2 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon icon={item.icon} width="24" height="24" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="cursor-pointer w-full flex items-center gap-3 px-4 py-2 text-red-700 hover:bg-red-100 rounded-md transition"
          >
            <Icon icon="fluent:arrow-exit-32-filled" width="24" height="24" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white backdrop-blur-lg border-t shadow-md p-2 md:hidden z-50">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-6 px-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs shrink-0 ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`
              }
            >
              <Icon icon={item.icon} width="28" height="28" />
              <span className="mt-1">{item.title}</span>
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="text-red-600 flex flex-col items-center text-xs shrink-0"
          >
            <Icon icon="fluent:arrow-exit-32-filled" width="28" height="28" />
            <span className="mt-1">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
