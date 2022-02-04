import React from "react";
import { Outlet } from "react-router-dom";

function BodyHolder(props) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default BodyHolder;
