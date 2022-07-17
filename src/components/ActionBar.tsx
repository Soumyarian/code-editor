import { FC } from "react";
import { FiArrowDown, FiArrowUp, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deleteCell, moveCell } from "../state";

interface Props {
  id: string;
}

export const ActionBar: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row space-x-2 w-full bg-gray-900 py-1 px-2">
      <button
        className="icon-button"
        onClick={() => dispatch(moveCell({ id, direction: "up" }))}>
        <FiArrowUp />
      </button>
      <button
        className="icon-button"
        onClick={() => dispatch(moveCell({ id, direction: "down" }))}>
        <FiArrowDown />
      </button>
      <button
        className="icon-button"
        onClick={() => dispatch(deleteCell({ id }))}>
        <FiTrash2 />
      </button>
    </div>
  );
};
