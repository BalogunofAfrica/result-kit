import type {
  AsyncFunction,
  Err,
  None,
  OK,
  Option,
  Result,
  SyncFunction,
} from "./types";

export function ok<T>(data: T): OK<T> {
  return {
    data,
    ok: true,
  };
}

export function err<E>(error: E): Err<E> {
  return {
    error,
    ok: false,
  };
}

export function isNone<T>(data: Option<T>): data is None {
  return data === null || data === undefined;
}

export function unwrapError<E>(
  defaultMessage: string,
  getError?: (error: unknown) => E
) {
  if (getError) return getError;

  return (error: unknown) => {
    const message = error instanceof Error ? error.message : defaultMessage;
    return new Error(message) as E;
  };
}

export function runSync<T, E = Error>(
  fn: SyncFunction<() => T>,
  getError?: (error: unknown) => E
): Result<T, E> {
  try {
    const data = fn();
    return ok(data);
  } catch (error) {
    const unwrappedError = unwrapError(
      "Synchronous operation failed, an unexpected error occurred",
      getError
    )(error);
    return err(unwrappedError);
  }
}

export async function runAsync<T, E = Error>(
  fn: AsyncFunction<() => Promise<T>>,
  getError?: (error: unknown) => E
): Promise<Result<T, E>> {
  try {
    const data = await fn();
    return ok(data);
  } catch (error) {
    const unwrappedError = unwrapError(
      "Asynchronous operation failed, an unexpected error occurred or promise rejected",
      getError
    )(error);
    return err(unwrappedError);
  }
}
