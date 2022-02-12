import mongoose from 'mongoose';

import { CreateContextHook, IdModel } from "./service";

export const generateRandomIdHook = <T extends IdModel>(): CreateContextHook<T> => async (context) => ({
  ...context,
  data: {
    ...context.data,
    _id: (new mongoose.mongo.ObjectId()).toString()
  }
})