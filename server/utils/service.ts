import { composePromises, Hook } from "./compose";

interface CreateContext<T> {
  data: Partial<T>,
  result?: T,
}

const withCreateContext = <T>(data: Partial<T>): CreateContext<T> => ({
  data,
})

export type CreateContextHook<T> = Hook<CreateContext<T>>;

export const createService = <T>(hooks: Array<CreateContextHook<T>>) => async (data: Partial<T>) => (
  await (await composePromises(hooks, withCreateContext(data))).result
)


interface ContextParams<T> {
  query: Partial<T>,
}

interface ListContext<T> {
  params: ContextParams<T>,
  result?: {
    total: number,
    data: Array<T>
  },
}

const withListContext = <T>(query: Partial<T>): ListContext<T> => ({
  params: {
    query
  }
})

export type ListContextHook<T> = Hook<ListContext<T>>;

export const listService = <T>(hooks: Array<ListContextHook<T>>) => async (query: Partial<T>) => (
  await (await composePromises(hooks, withListContext(query))).result
)
