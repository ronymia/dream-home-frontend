import { useState } from "react";

function Chat() {
  const [chat, setChat] = useState(true);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col gap-5 overflow-y-scroll">
        <h1 className="font-light">Messages</h1>
        <div className="message bg-white p-5 rounded-lg flex items-center gap-5 cursor-pointer">
          <img
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-bold">John Doe</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        {/* Repeat similar message blocks for other messages */}
        <div className="message bg-white p-5 rounded-lg flex items-center gap-5 cursor-pointer">
          <img
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-bold">John Doe</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        {/* More message blocks */}
      </div>

      {chat && (
        <div className="flex-1 bg-white flex flex-col justify-between">
          <div className="top bg-[#f7c14b85] p-5 font-bold flex items-center justify-between">
            <div className="user flex items-center gap-5">
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              John Doe
            </div>
            <span
              className="close cursor-pointer"
              onClick={() => setChat(null)}
            >
              X
            </span>
          </div>

          <div className="center flex-1 overflow-y-scroll p-5 flex flex-col gap-5">
            <div className="chatMessage w-1/2">
              <p>Lorem ipsum dolor sit amet</p>
              <span className="text-xs bg-[#f7c14b39] px-2 py-1 rounded-md">
                1 hour ago
              </span>
            </div>
            <div className="chatMessage own w-1/2 self-end text-right">
              <p>Lorem ipsum dolor sit amet</p>
              <span className="text-xs bg-[#f7c14b39] px-2 py-1 rounded-md">
                1 hour ago
              </span>
            </div>
            {/* More chat messages */}
          </div>

          <div className="bottom border-t-2 border-[#f7c14b85] h-16 flex items-center justify-between">
            <textarea
              className="flex-3 h-full p-5 border-none"
              placeholder="Type a message..."
            ></textarea>
            <button className="flex-1 bg-[#f7c14b85] h-full border-none cursor-pointer">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
