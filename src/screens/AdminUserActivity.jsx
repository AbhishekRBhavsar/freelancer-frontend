


import React from "react";
import { Navbar, SkillsCard } from "./components";
import { UserActivity } from "./components";
// import { JobListing } from "./components";

const AdminUserActivity = ({ user }) => {
  // const logout = () => {
  //   localStorage.removeItem("user");
  //   window.location.reload();
  // };
  return (
    <>
      <Navbar />
      <UserActivity />
    </>
  );
};

export default AdminUserActivity;