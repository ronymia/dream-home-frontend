import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import "./rootLayout.scss";

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
