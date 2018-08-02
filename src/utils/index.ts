export type Procedure = (...args: any[]) => void

export interface Options {
  isImmediate: boolean,
}

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options: Options = {
    isImmediate: false,
  },
): F {
  let timeoutId: number | undefined

  return function(this: any, ...args: any[]) {
    const context = this

    const doLater = (): void => {
      timeoutId = undefined
      if (!options.isImmediate) {
        func.apply(context, args)
      }
    }

    const shouldCallNow = options.isImmediate && timeoutId === undefined

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }

    timeoutId = window.setTimeout(doLater, waitMilliseconds)

    if (shouldCallNow) {
      func.apply(context, args)
    }
  } as any
}

export function param2Obj(url: string): object {
  const search = url
  if (!search) {
    return {}
  }
  const result = decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')
  return JSON.parse('{"' + result + '"}')
}

function extend<T>(to: T, from: T) {
  for (const key in from) {
    if (key) { to[key] = from[key] }
  }
  return to
}

export function toObject<T>(arr: T[]) {
  const res = {}
  for (const i of arr) {
    if (i) {
      extend(res, i)
    }
  }
  return res
}
