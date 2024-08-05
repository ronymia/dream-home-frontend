import { Outlet } from "react-router-dom";
import "./rootLayout.scss";
import Navbar from "./navbar/Navbar";

export default function RootLayout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
