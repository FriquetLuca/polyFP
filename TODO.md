function match<
  T extends { type: string },
  TResult
>(
  value: T,
  handlers: {
    [K in T["type"]]:
      (value: Extract<T, { type: K }>) => TResult
  }
): TResult {
  return handlers[value.type](
    value as Extract<T, { type: typeof value.type }>
  )
}

function match<
  T extends PropertyKey,
  TResult
>(
  value: T,
  cases: Record<T, () => TResult>
): TResult {
  return cases[value]()
}

function sequence<T, E>(
  results: Result<T, E>[]
): Result<T[], E> {
  const values: T[] = []

  for (const result of results) {
    if (!result.ok) {
      return result
    }

    values.push(result.value)
  }

  return {
    ok: true,
    value: values
  }
}
