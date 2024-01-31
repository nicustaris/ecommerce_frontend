import React from "react";
import { logout } from "../../services/userServices";

const Logout = () => {
  logout();
  window.location = "/";
  return null;
};

export default Logout;
