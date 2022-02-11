import mongoose from 'mongoose';

import { CreateContextHook } from "./service";

export const generateRandomIdHook = <T>(): CreateContextHook<T> => async (context) => ({
  ...context,
  data: {
    ...context.data,
    _id: (new mongoose.mongo.ObjectId()).toString()
  }
})