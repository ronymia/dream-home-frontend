import { listData } from "../../libs/dammyData";
import Filter from "./components/Filter";
import Map from "../../components/map/Map";
import Card from "../../components/card/Card";

export default function ListPage() {
  const data = listData;

  return (
    <div className="listPage">
      <section className="listContainer">
        <div className="wrapper">
          <Filter />
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </section>
      <section className="mapContainer">
        <Map items={data} />
      </section>
    </div>
  );
}
