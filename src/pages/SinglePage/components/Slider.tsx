import { useState } from "react";
import "./slider.scss";

/**
 * Component for rendering a slider of images.
 * @interface ISliderProps
 * @property {string[]} images - Array of image URLs.
 */
interface ISliderProps {
  // Array of image URLs.
  images: string[];
}
interface ISliderProps {
  images: string[];
}

export default function Slider({ images }: ISliderProps) {
  const [imageIndex, setImageIndex] = useState<null | number>(null);

  const changeSlide = (direction: "left" | "right") => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex((prev) => prev! - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex((prev) => prev! + 1);
      }
    }
  };

  return (
    <section className="slider">
      {/* Slider */}
      {imageIndex !== null && (
        <div className="fullSlider">
          {/* left arrow */}
          <div className="arrow">
            <img src="/arrow.png" alt="" onClick={() => changeSlide("left")} />
          </div>
          {/* slider big image */}
          <div className="imageContainer">
            <img src={images[imageIndex]} alt="" />
          </div>

          {/* right arrow */}
          <div className="arrow">
            <img
              src="/arrow.png"
              alt=""
              className="right"
              onClick={() => changeSlide("right")}
            />
          </div>

          {/* close btn  */}
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}

      {/* Big Image Slider */}
      <div className="bigImage">
        <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
      </div>

      {/* Small Image Slider */}
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </section>
  );
}
