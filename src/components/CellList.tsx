import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./CellListItem";

const CellList = () => {
  const cells = useTypedSelector(state =>
    state.cell.order.map(id => state.cell.data[id])
  );
  const renderCell = cells.map(c => <CellListItem key={c.id} cell={c} />);
  return <div className="space-y-4 p-2">{renderCell}</div>;
};

export default CellList;
