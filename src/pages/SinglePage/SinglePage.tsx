import Map from "../../components/map/Map";
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
        <div className="wrapper">
          {/* General Info  */}
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pet Allowed</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>

          {/* ROOM INFO  */}
          <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="size.png" alt="" />
              <span>80sqfit</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>2 beds</span>
            </div>
            <div className="size">
              <img src="/bath.png.png" alt="" />
              <span>1 bathroom</span>
            </div>
          </div>

          {/* NEAR PLACES   */}
          <p className="title">Near Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
          </div>

          {/* Location Map  */}
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[singlePostInfo]} />
          </div>

          {/* Buttons  */}
          <div className="buttons">
            <button type="button">
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button type="button">
              <img src="/save.png" alt="" />
              Save the Places
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
