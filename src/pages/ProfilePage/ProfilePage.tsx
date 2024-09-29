import { logOut } from "../../app/features/authSlice";
import { useAppDispatch } from "../../app/hooks";
import Chat from "./components/Chat";
import List from "./components/List";
import "./profilePage.scss";

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  return (
    <div className="profilePage">
      {/* USER DETAILS  */}
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>
            <span>
              Username: <b>John Doe</b>
            </span>
            <span>
              E-mail: <b>john@gmail.com</b>
            </span>

            <button type="button" onClick={() => dispatch(logOut())}>
              Log Out
            </button>
          </div>

          {/* MY NEW POST LIST */}
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>

      {/* CHAT  */}
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}
