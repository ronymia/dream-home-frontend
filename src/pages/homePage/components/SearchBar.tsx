import { useState } from "react";
import "./searchBar.scss";

const types: string[] = ["buy", "rent"];

interface SearchQuery {
  type: string;
  location: string;
  minPrice: number;
  maxPrice: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState<SearchQuery>({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const handleSwitchType = (val: string) => {
    setQuery((prev) => ({
      ...prev,
      type: val,
    }));
  };

  return (
    <section className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            // type="button"
            onClick={() => handleSwitchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Form  */}
      <form action="">
        <input type="text" name="location" placeholder="City Location" />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
        />
        <button>
          <img src="/search.png" alt="" />
        </button>
      </form>
    </section>
  );
}
