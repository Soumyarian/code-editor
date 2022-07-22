import { FC, useEffect } from "react";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import { Resizable } from "./Resizable";
import { ResizeContextProvider } from "../context/ResizeContext/ResizeContext";
import { bundleCode, Cell, updateCell } from "../state";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import LoadingIndicator from "./LoadingIndicator";

let timer: ReturnType<typeof setTimeout>;

export const CodeCell: FC<{ cell: Cell }> = ({ cell }) => {
  const dispatch = useTypedDispatch();
  const bundle = useTypedSelector(state => state.bundle[cell.id]);

  useEffect(() => {
    if (!bundle) {
      dispatch(bundleCode({ cellid: cell.id, input: cell.content }));
      return;
    }
    timer = setTimeout(async () => {
      dispatch(bundleCode({ cellid: cell.id, input: cell.content }));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
    //233 video number es lint disable
  }, [cell.content, cell.id]);

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
            {!bundle || bundle.loading ? (
              <div className="h-full flex items-center justify-center">
                <LoadingIndicator />
              </div>
            ) : (
              <Preview code={bundle.code} err={bundle.err} />
            )}
          </div>
        </div>
      </Resizable>
    </ResizeContextProvider>
  );
};
