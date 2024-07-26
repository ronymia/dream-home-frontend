import { listData } from "../../libs/dammyData";
import Card from "./components/Card";
import Filter from "./components/Filter";
import "./listPage.scss";

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
      <section className="mapContainer">map</section>
    </div>
  );
}
