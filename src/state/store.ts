import { configureStore } from "@reduxjs/toolkit";
import { cellReducer, insertCellBefore } from "./reducers/cellsReducers";

export const store = configureStore({
  reducer: {
    cell: cellReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

store.dispatch(insertCellBefore({ id: null, type: "code" }));
store.dispatch(insertCellBefore({ id: null, type: "text" }));
