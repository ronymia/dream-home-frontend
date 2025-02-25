import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useLazyOnAuthStateChangeQuery } from "../libs/apis/authApi";
import { useEffect } from "react";
import { useAppDispatch } from "../libs/hooks";
import { logOut, setUser } from "../libs/slice/authSlice";

export default function RootLayout() {
  const appDispatch = useAppDispatch();
  const [onAuthStateChange] = useLazyOnAuthStateChangeQuery();

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted

    const fetchData = async () => {
      try {
        const rep = await onAuthStateChange({}).unwrap();
        if (isMounted) {
          // SET USER
          appDispatch(setUser(rep));
        }
      } catch (err) {
        if (isMounted) {
          // Log out the user if there's an error
          console.warn({ err });
          appDispatch(logOut());
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false; // Set flag to false when component unmounts
    };
  }, [appDispatch, onAuthStateChange]);

  return (
    <main className="px-5">
      <>
        <Navbar />
      </>
      <>
        <Outlet />
      </>
    </main>
  );
}
