export type OK<T> = { ok: true; data: T };
export type Err<E> = { ok: false; error: E };
export type Result<T, E> = OK<T> | Err<E>;
export type None = null | undefined;
export type Option<T> = T | None;
export type NonOption<T = unknown> = T & {};
export type SyncFunction<T extends (...args: Array<unknown>) => unknown> =
  ReturnType<T> extends PromiseLike<unknown> ? never : T;
export type AsyncFunction<T extends (...args: Array<unknown>) => unknown> =
  ReturnType<T> extends PromiseLike<unknown> ? T : never;
