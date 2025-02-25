import { useNavigate } from "react-router-dom";
import { logOut } from "../../libs/slice/authSlice";
import { useAppDispatch } from "../../libs/hooks";
import Chat from "./components/Chat";
import List from "./components/List";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-full overflow-hidden md:flex-col">
      {/* USER DETAILS */}
      <div className="flex-3 overflow-y-scroll pb-12 md:flex-none md:h-auto md:overflow-auto">
        <div className="pr-12 space-y-12">
          <div className="flex justify-between items-center">
            <h1 className="font-light">User Information</h1>
            <button
              type="button"
              onClick={() => navigate("update")}
              className="py-3 px-6 bg-[#fece51] cursor-pointer"
            >
              Update Profile
            </button>
          </div>
          <div className="space-y-5">
            <span className="flex items-center gap-5">
              Avatar:
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="user avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </span>
            <span>
              Username: <b>John Doe</b>
            </span>
            <span>
              E-mail: <b>john@gmail.com</b>
            </span>

            <button
              type="button"
              onClick={() => dispatch(logOut())}
              className="py-3 px-6 bg-teal-500 text-white font-bold rounded cursor-pointer"
            >
              Log Out
            </button>
          </div>

          {/* MY NEW POST LIST */}
          <div className="flex justify-between items-center">
            <h1 className="font-light">My List</h1>
            <button className="py-3 px-6 bg-[#fece51] cursor-pointer">
              Create New Post
            </button>
          </div>
          <List />

          <div className="flex justify-between items-center">
            <h1 className="font-light">Saved List</h1>
          </div>
          <List />
        </div>
      </div>

      {/* CHAT */}
      <div className="flex-2 bg-[#fcf5f3] h-full md:flex-none md:h-auto">
        <div className="px-5 h-full">
          <Chat />
        </div>
      </div>
    </div>
  );
}
