import { Link, NavLink } from "react-router-dom";
import { Fragment, useState } from "react";
import { useAppSelector } from "../libs/hooks";
import { motion } from "motion/react";

const NAV_LINK = [
  {
    id: crypto.randomUUID(),
    label: "Home",
    path: "/",
  },
  {
    id: crypto.randomUUID(),
    label: "About",
    path: "/about",
  },
  {
    id: crypto.randomUUID(),
    label: "Contact Us",
    path: "/contact-us",
  },
  {
    id: crypto.randomUUID(),
    label: "Agents",
    path: "/agents",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <nav className="h-20 flex items-center justify-between">
      {/* <!-- LEFT SECTION --> */}
      <div className="flex flex-[3] items-center gap-12">
        {/* <!-- LOGO --> */}
        <Link to="/" className="font-bold text-lg flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-7 h-7" />
          <span className="hidden md:inline">DreamHome</span>
        </Link>

        {/* <!-- NAV LINKS --> */}
        <div className="hidden sm:flex items-center gap-6">
          {NAV_LINK.map(({ id, label, path }) => (
            <NavLink
              key={id}
              to={path}
              className="transition duration-300 hover:scale-105"
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* <!-- RIGHT SECTION --> */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-[2] items-center justify-end h-full bg-[#fcf5f3] md:bg-transparent gap-1"
      >
        {user ? (
          <Fragment>
            {/* <!-- USER INFO --> */}
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="hidden sm:inline">John Doe</span>
            <Link
              to="/profile"
              className="relative px-6 py-3 bg-[#fece51] rounded text-center hover:scale-105 transition-all"
            >
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                3
              </div>
              Profile
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <NavLink
              to="/auth/login"
              className="text-sm md:text-base font-medium px-3 py-2 text-secondary border-2 border-solid border-secondary  hover:scale-105 transition-all"
            >
              Log in
            </NavLink>
            <NavLink
              to="/auth/register"
              className="text-sm md:text-base font-bold px-3 py-2 bg-secondary border border-solid border-secondary text-white hover:scale-105 transition-all"
            >
              Sign up
            </NavLink>
          </Fragment>
        )}
      </motion.div>

      {/* <!-- HAMBURGER MENU --> */}
      <div className="sm:hidden">
        <figure>
          <img
            src="/menu.png"
            alt="menu"
            onClick={() => setOpen((prev) => !prev)}
            className="w-9 h-9 cursor-pointer"
          />
        </figure>

        <div
          className={`absolute top-0 right-0 w-1/2 h-screen bg-black text-white flex flex-col items-center justify-center gap-6 transition-all duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {NAV_LINK.map(({ id, label, path }) => (
            <NavLink
              key={id}
              to={path}
              className="text-lg hover:underline"
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
