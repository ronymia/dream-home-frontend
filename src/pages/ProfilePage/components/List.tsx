import Card from "../../../components/card/Card";
import { listData } from "../../../libs/dammyData";

export default function List() {
  return (
    <div className="flex flex-col gap-5">
      {listData.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}
