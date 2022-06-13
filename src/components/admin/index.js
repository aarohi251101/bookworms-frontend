import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import { AccountCircle } from "@mui/icons-material";

const Admin = () => {
  const options = [
    {
      name: "Profile",
      icon: <AccountCircle />,
      link: "/admin/profile",
    },
    {
      name: "Manage Users",
      icon: <AccountCircle />,
      link: "/admin/manageuser",
    },
  ];

  return (
    <div>
      <h1>Admin Component</h1>
      <Sidebar title="Admin Dashboard" options={options}>
        <Outlet />
      </Sidebar>
    </div>
  );
};

export default Admin;