import { CreateContextHook, ListContextHook } from "./service"

export const createMemoryDao = <T>(data:Array<T>): CreateContextHook<T> => async (context) => {
  data.push(context.data as Required<T>)
  return {
    ...context,
    result: context.data as Required<T>
  }
}

export const queryMemoryDao = <T>(data:Array<T>): ListContextHook<T> => async (context) => {
  return {
    ...context,
    result: {
      total: data.length,
      data
    }
  }
}