
export type Hook<T> = (context: T) => Promise<T>

export const composePromises = <T>(promises: Array<Hook<T>>, context: T) => (
  promises.reduce(
    async (previous, next) => next(await previous),
    Promise.resolve(context)
  )
)
