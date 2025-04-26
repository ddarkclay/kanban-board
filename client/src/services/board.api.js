import api from "./http.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_PATHS = {
  GET_BOARDS: "/api/boards",
};

export const getBoards = createAsyncThunk("boards", async () => {
  return api.get(API_PATHS.GET_BOARDS);
});

// export const modifyOrders = createAsyncThunk("modify-order", async (data) => {
//   const body = {
//     cancelOrder: data?.cancelOrder,
//     ...(data?.cancelOrder === false && { limitPrice: data?.limitPrice }),
//   };

//   return api.put(API_PATHS.MODIFY_ORDERS + data?.orderId, body);
// });
