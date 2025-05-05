import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/userSlice";
import { toast } from "sonner";
import { Modal } from "antd";

const Sidebar = () => {
  const dispatch = useDispatch();

  const adminSideItems = [
    {
      path: "/dashboard",
      icon: "fluent-color:calendar-data-bar-24",
      title: "Dashboard",
    },
    {
      path: "/employee",
      icon: "fluent-color:people-team-24",
      title: "Employee",
    },
    {
      path: "/project",
      icon: "fluent-color:design-ideas-24",
      title: "Projects",
    },
  ];

  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        dispatch(logout());
        toast.success("Session ended successfully.");
      },
    });
  };

  return (
    <div className="w-40 h-full overflow-auto bg-white shadow-md flex flex-col justify-between">
      <div>
        <h1 className="text-center text-xl font-semibold py-4">TaskFlow</h1>
      </div>
      <div className="p-4 flex flex-col gap-4">
        {adminSideItems.map((items, i) => (
          <NavLink
            key={i}
            to={items.path}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 ${
                isActive
                  ? "bg-gray-100 border-r-2 border-b-gray-500"
                  : "text-gray-700"
              }`
            }
          >
            <Icon icon={items.icon} width="24" height="24" />
            <span>{items.title}</span>
          </NavLink>
        ))}
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-100 text-red-900 cursor-pointer"
      >
        <Icon icon="fluent:arrow-exit-32-filled" width="24" height="24" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
