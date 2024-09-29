import { Link, NavLink } from "react-router-dom";
import "./navbar.scss";
import { Fragment, useState } from "react";
import { useAppSelector } from "../../app/hooks";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <nav>
      <div className="left">
        {/* HAMBURGER ICON FOR MOBILE */}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>

        {/* LOGO AND INFO */}
        <Link to={"/"} className="logo">
          <img src="./logo.png" alt="" />
          <span>DreamHome</span>
        </Link>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
        <NavLink to={"/agent"}>Agents</NavLink>

        {/* Menu Icon
         * MOBILE RESPONSIVE
         */}
        <div
          style={{
            display: open ? "flex" : "none",
          }}
          className={open ? "menu active" : "menu"}
        >
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
          <NavLink to={"/agent"}>Agents</NavLink>
          <NavLink to="/auth/login">Sign in</NavLink>
          <NavLink to="/auth/register" className="register">
            Sign up
          </NavLink>
        </div>
      </div>

      <div className="right">
        {user ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Doe</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <Fragment>
            <NavLink to="/auth/login">Sign in</NavLink>
            <NavLink to="/auth/register">Sign up</NavLink>
          </Fragment>
        )}
      </div>
    </nav>
  );
}
