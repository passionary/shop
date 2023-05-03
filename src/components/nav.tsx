import React from "react";
import { useNavigate } from "react-router-dom";

export default function ({ children }: any) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <p className="ms-4 mt-4">
      <a href="#" onClick={() => navigate(-1)}>BACK</a>
      </p>
      <div className="mb-5"></div>
      { children }
    </div>
  )
}