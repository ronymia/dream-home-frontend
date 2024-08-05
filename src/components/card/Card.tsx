import React from "react";
import { Link } from "react-router-dom";
import "./card.scss";

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
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item?.img} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>

        {/* address  */}
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>

        {/* price  */}
        <p className="price">$ {item.price}</p>

        {/* bottom section  */}
        <div className="bottom">
          <div className="features">
            {/* bedroom  */}
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            {/* bathroom  */}
            <div className="feature">
              <img src="/bathroom" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>

          {/* icons */}
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
