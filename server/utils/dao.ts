import { CreateContextHook, IdModel, ListContextHook, UpdateContextHook } from "./service"

export const createMemoryDao = <T extends IdModel>(data:Array<T>): CreateContextHook<T> => async (context) => {
  data.push(context.data as Required<T>)
  return {
    ...context,
    result: context.data as Required<T>
  }
}

export const queryMemoryDao = <T extends IdModel>(data:Array<T>): ListContextHook<T> => async (context) => {
  return {
    ...context,
    result: {
      total: data.length,
      data: context.params.query._id 
        ? data.filter((item) => item._id == context.params.query._id)
        : data
    }
  }
}

export const updateMemoryDao = <T extends IdModel>(data:Array<T>): UpdateContextHook<T> => async (context) => {
  const updated = data
    .filter((item) => context.params.query._id === item._id)
    .map((_item) => context.data)

  const oldData = [...data];
  data.length = 0;
  data.push(...[
    ...oldData.filter((item) => context.params.query._id !== item._id),
    ...updated as T[]
  ])

  return {
    ...context,
    result: {
      total: updated.length,
      data: updated as T[]
    }
  }
}
