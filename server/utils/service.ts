import { composePromises, Hook } from "./compose";
import { io } from "./io";

export interface IdModel {
  _id: string;
}

interface CreateContext<T extends IdModel> {
  data: Partial<T>,
  result?: T,
}

const withCreateContext = <T extends IdModel>(data: Partial<T>): CreateContext<T> => ({
  data,
})

export type CreateContextHook<T extends IdModel> = Hook<CreateContext<T>>;

export const createService = <T extends IdModel>(
  hooks: Array<CreateContextHook<T>>,
  eventName: string,
) => async (data: Partial<T>) => {
  const result =  await (await composePromises(hooks, withCreateContext(data))).result;
  io.emit(eventName, result);
  return result;
}


interface ContextParams<T extends IdModel> {
  query: Partial<T>,
}

interface ListContext<T extends IdModel> {
  params: ContextParams<T>,
  result?: {
    total: number,
    data: Array<T>
  },
}

const withListContext = <T extends IdModel>(query: Partial<T>): ListContext<T> => ({
  params: {
    query
  }
})

export type ListContextHook<T extends IdModel> = Hook<ListContext<T>>;

export const listService = <T extends IdModel>(
  hooks: Array<ListContextHook<T>>
) => async (query: Partial<T>) => (
  await (await composePromises(hooks, withListContext(query))).result
)

interface UpdateContext<T extends IdModel> {
  params: ContextParams<T>,
  data: Partial<T>,
  result?: {
    total: number,
    data: Array<T>
  },
}

const withUpdateContext = <T extends IdModel>(query: Partial<T>, data: Partial<T>): UpdateContext<T> => ({
  params: {
    query
  },
  data
})

export type UpdateContextHook<T extends IdModel> = Hook<UpdateContext<T>>;

export const updateService = <T extends IdModel>(
  hooks: Array<UpdateContextHook<T>>,
  eventName: string,
) => async (query: Partial<T>, data: Partial<T>) => {
  const result = await (await composePromises(hooks, withUpdateContext(query, data))).result;
  io.emit(eventName, result);
  return result;
}
