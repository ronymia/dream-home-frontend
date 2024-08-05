import "./list.scss";
import Card from "../../../components/card/Card";
import { listData } from "../../../libs/dammyData";

export default function List() {
  return (
    <div className="list">
      {listData.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}
