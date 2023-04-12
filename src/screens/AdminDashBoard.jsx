


import React from "react";
import { Navbar, SkillsCard } from "./components";
import { UserList } from "./components";
// import { JobListing } from "./components";

const AdminDashBoard = ({ user }) => {
  // const logout = () => {
  //   localStorage.removeItem("user");
  //   window.location.reload();
  // };
  return (
    <>
      <Navbar />
      <UserList />
    </>
  );
};

export default AdminDashBoard;