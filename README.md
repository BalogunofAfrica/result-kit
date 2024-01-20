# Result Kit

A minimal typescript implementation of a result type. Inspired by [Rust's Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html "Rust Result").

## Installation:

To install `result-kit` run:

```sh
bun install result-kit
```

Or

```sh
yarn add result-kit
```

Or

```sh
npm install result-kit
```

## Before:

```ts
async function fetchDogs(): Promise<unknown> {
  const dogs = await fetch("/dog");
  return dogs;
}
function parseJson(result: unknown): unknown {
  return JSON.parse(result);
}

await function runExample() {
  const dogs = await fetchDogs();
  parseJson(dogs);
};
```

The major problem with the implementation above is that the function signature doesn't indicate to the caller that they might throw an error so the developer might not get to handle the scenario where there is an error and would only find out when they run the piece of code.

## With Results:

```ts
import { runSync, runAsync } from "result-kit";

async function fetchDogs(): Promise<Result<unknown, Error>> {
  return runAsync(async () => {
    const dogs = await fetch("/dog");
    return dogs;
  });
}
function parseJson(result): Result<unknown, Error> {
  return runSync(() => JSON.parse(result));
}

await function runExample() {
  const dogsResult = await fetchDogs();

  if (!dogsResult.ok) {
    // Handle error
    return;
  }

  parseJson(dogsResult.value);
};
```

With Results the function signature tells the caller that it returns a result which the caller has to check if the `ok` field is `true` (success) to be able to use (unwrap) the `value` field, otherwise `ok` is `false` (failure) and we can also access the `error` field with the appropriate error.

`runSync` and `runAsync` are just wrapper functions that uses the the underlying `err` and `ok` functions to handle both synchronous and asynchronous operations respectfully.
