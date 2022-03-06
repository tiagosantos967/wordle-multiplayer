import { composePromises, Hook } from "./compose";

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
  onCreate?: (result: T) => Promise<void>,
) => async (data: Partial<T>) => {
  const result =  await (await composePromises(hooks, withCreateContext(data))).result;
  onCreate && result && await onCreate(result)
  return result;
}

interface ContextParams<T extends IdModel> {
  query: Partial<T>,
}

export interface ListResult<T extends IdModel> {
  total: number,
  data: Array<T>
}

interface ListContext<T extends IdModel> {
  params: ContextParams<T>,
  result?: ListResult<T>,
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
  result?: T,
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
  onUpdate?: (result: T) => Promise<void>,
) => async (query: Partial<T>, data: Partial<T>) => {
  const result = await (await composePromises(hooks, withUpdateContext(query, data))).result;
  onUpdate && result && await onUpdate(result)
  return result;
}
