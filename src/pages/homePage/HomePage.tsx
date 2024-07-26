import SearchBar from "./components/SearchBar";
import "./homePage.scss";

export default function HomePage() {
  return (
    <div className="homePage">
      <section className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            illo, est reprehenderit blanditiis magnam exercitationem neque
            voluptates officia quidem eaque doloribus! Quae rem molestias minus?
          </p>

          <SearchBar />

          <section className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Year Of Experience</h2>
            </div>
            <div className="box">
              <h1>200+</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </section>
        </div>
      </section>
      <section className="imgContainer">
        <img src="./bg.png" alt="" />
      </section>
    </div>
  );
}
