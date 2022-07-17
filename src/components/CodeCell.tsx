import { FC, useEffect, useState } from "react";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import { bundler } from "../bundler";
import { Resizable } from "./Resizable";
import { ResizeContextProvider } from "../context/ResizeContext/ResizeContext";
import { Cell, updateCell } from "../state";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";

let timer: ReturnType<typeof setTimeout>;

export const CodeCell: FC<{ cell: Cell }> = ({ cell }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const executeCode = async () => {
    const output = await bundler(cell.content);
    setCode(output.code);
    setError(output.err);
  };

  useEffect(() => {
    timer = setTimeout(async () => {
      await executeCode();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <ResizeContextProvider>
      <Resizable direction="vertical">
        <div className="flex w-full h-full">
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue="const a = 1"
              value={cell.content}
              onChange={value =>
                dispatch(updateCell({ id: cell.id, content: value }))
              }
            />
          </Resizable>
          <div className="flex-1">
            <Preview code={code} err={error} />
          </div>
        </div>
      </Resizable>
    </ResizeContextProvider>
  );
};
