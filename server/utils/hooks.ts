import mongoose from 'mongoose';

import { CreateContextHook, IdModel, ListContextHook } from "./service";

export const generateRandomIdHook = <T extends IdModel>(): CreateContextHook<T> => async (context) => ({
  ...context,
  data: {
    ...context.data,
    _id: (new mongoose.mongo.ObjectId()).toString()
  }
})

export const selectRandomFromResult = <T extends IdModel>(): ListContextHook<T> => async (context) => {
  const total = context.result?.total;

  if(!total) {
    // throw error here
    return context;
  }

  const selectedId = Math.floor(Math.random() * total);
  const selected = context.result?.data[selectedId];

  if(!selected){
    // throw error here
    return context;
  }

  return {
    ...context,
    result: {
      total: 1,
      data: [ selected ]
    }
  };
}