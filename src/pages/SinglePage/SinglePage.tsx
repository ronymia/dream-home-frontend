import { singlePostData, userData } from "../../libs/dammyData";
import { ISinglePost } from "../../types/data.interface";
import Slider from "./components/Slider";
import "./singlePage.scss";

export default function SinglePage() {
  const singlePostInfo: ISinglePost = singlePostData;

  return (
    <div className="singlePage">
      {/* left  */}
      <section className="details">
        <div className="wrapper">
          {/* Slider  */}
          <Slider images={singlePostInfo.images} />

          {/* Info  */}

          <section className="info">
            {/* Top  */}
            <div className="top">
              {/* post  info*/}
              <div className="post">
                {/* Title  */}
                <h1>{singlePostInfo.title}</h1>
                {/* address  */}
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{singlePostInfo.address}</span>
                </div>
                {/* price  */}
                <p className="price">$ {singlePostInfo.price}</p>
              </div>

              {/* user info  */}
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>

            {/* Bottom  */}
            <div className="bottom">{singlePostInfo.description}</div>
          </section>
        </div>
      </section>

      {/* Right  */}
      <section className="features">
        <div className="wrapper"></div>
      </section>
    </div>
  );
}
