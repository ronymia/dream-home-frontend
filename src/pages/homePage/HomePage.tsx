import { useState } from "react";

export default function HomePage() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* <!-- LEFT SIDE --> */}
      <section className="flex-3">
        <div className="h-full w-4/5 flex flex-col justify-center items-start gap-5">
          <h1 className="text-6xl lg:text-5xl font-bold text-secondary">
            Find Real Estate & Get Your Dream Place
          </h1>
          <p className="text-base font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            illo, est reprehenderit blanditiis magnam exercitationem neque
            voluptates officia quidem eaque doloribus! Quae rem molestias minus?
          </p>

          {/* <----------SEARCH BOX --------------------> */}
          <SearchBar />

          <section className="flex justify-between sm:hidden">
            <div className="text-center">
              <h1 className="text-4xl lg:text-3xl">16+</h1>
              <h2 className="text-lg font-light">Year Of Experience</h2>
            </div>
            <div className="text-center">
              <h1 className="text-4xl lg:text-3xl">200+</h1>
              <h2 className="text-lg font-light">Award Gained</h2>
            </div>
            <div className="text-center">
              <h1 className="text-4xl lg:text-3xl">1200+</h1>
              <h2 className="text-lg font-light">Property Ready</h2>
            </div>
          </section>
        </div>
      </section>

      {/* <!-- RIGHT SIDE --> */}
      <section className="flex-2  bg-[#fcf5f3] items-center justify-center  flex">
        <img
          src="./bg.png"
          alt="background"
          className=" w-[115%] h-[125%] right-0 lg:w-[105%]"
        />
      </section>
    </div>
  );
}

interface IQueryKey {
  type: string;
  location: string;
  minPrice: number;
  maxPrice: number;
}

function SearchBar() {
  const types: string[] = ["buy", "rent"];
  const [queryKey, setQueryKey] = useState<IQueryKey>({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const handleSwitchType = (val: string) => {
    setQueryKey((prev) => ({
      ...prev,
      type: val,
    }));
  };

  console.log({ queryKey });

  return (
    <section className="flex flex-col">
      {/* Type Buttons */}
      <div className="flex">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => handleSwitchType(type)}
            className={`py-3 px-7 hover:bg-gray-100 border border-solid border-b-0 border-secondary  capitalize cursor-pointer 
              ${
                queryKey.type === type ? "bg-secondary text-white " : "bg-white"
              } 
              ${type === "buy" ? "rounded-tl-md border-r-0" : ""} 
              ${type === "rent" ? "rounded-tr-md border-l-0" : ""}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <form className="flex  border border-solid border-secondary gap-2 w-[90%]">
        <input
          type="text"
          name="location"
          placeholder="City Location"
          className=" border-none px-2 focus:outline-none max-w-md  sm:w-full sm:p-4 sm:border sm:border-gray-400"
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          className=" border-none px-2 focus:outline-none w-48 lg:w-36 sm:w-full sm:p-4 sm:border sm:border-gray-400"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          className=" border-none px-2 focus:outline-none w-48 lg:w-36 sm:w-full sm:p-4 sm:border sm:border-gray-400"
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-secondary text-white cursor-pointer sm:w-full sm:p-2"
        >
          {/* <img src="/search.png" alt="search" className="w-6 h-6" /> */}
          search
        </button>
      </form>
    </section>
  );
}
