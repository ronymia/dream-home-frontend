import { Link } from "react-router-dom";

interface IListData {
  id: number;
  title: string;
  img: string;
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
}

interface ICardProps {
  item: IListData;
  // children: React.ReactNode;
}

export default function Card({ item }: ICardProps) {
  return (
    <div className="flex gap-5">
      {/* Image Container */}
      <Link to={`/${item.id}`} className="flex-2 h-48">
        <img
          src={item?.img}
          alt=""
          className="w-full h-full rounded-lg object-cover"
        />
      </Link>

      {/* Text Container */}
      <div className="flex-3 flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 transition-all duration-300 hover:text-black hover:scale-105">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>

        {/* Address */}
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <img src="/pin.png" alt="" className="w-4 h-4" />
          <span>{item.address}</span>
        </p>

        {/* Price */}
        <p className="text-xl font-light px-3 py-1 rounded-lg bg-yellow-200 w-max">
          $ {item.price}
        </p>

        {/* Bottom Section */}
        <div className="flex justify-between gap-3">
          {/* Features */}
          <div className="flex gap-5 text-sm">
            {/* Bedroom */}
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
              <img src="/bed.png" alt="" className="w-4 h-4" />
              <span>{item.bedroom} bedroom</span>
            </div>

            {/* Bathroom */}
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
              <img src="/bathroom" alt="" className="w-4 h-4" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>

          {/* Icons */}
          <div className="flex gap-5">
            {/* Save Icon */}
            <div className="border border-gray-400 p-1.5 rounded-md cursor-pointer flex items-center justify-center hover:bg-gray-200">
              <img src="/save.png" alt="" className="w-5 h-5" />
            </div>

            {/* Chat Icon */}
            <div className="border border-gray-400 p-1.5 rounded-md cursor-pointer flex items-center justify-center hover:bg-gray-200">
              <img src="/chat.png" alt="" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
