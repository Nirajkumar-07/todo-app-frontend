import React from "react";
import { Navigate, useNavigate } from "react-router";

export default function IndexPage() {
  return <Navigate to={"/dashboard"} />;
}
