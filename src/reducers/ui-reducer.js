const defaultState = {
  pages: 0,
  displayedPage: 0
}

export default function (state = defaultState, action) {
  const newState = deepClone(state)
  switch (action.type) {
    case 'SET_TOTAL_PAGES':
      newState.pages = action.payload
      break
    case 'DISPLAY_PAGE':
      newState.displayedPage = action.payload
      break
  }
  return newState
}

function deepClone(obj, hash = new WeakMap()) {
  if (Object(obj) !== obj) return obj
  if (hash.has(obj)) return hash.get(obj)
  var result = Array.isArray(obj) ? []
    : obj.constructor ? new obj.constructor() : Object.create(null)
  hash.set(obj, result)
  if (obj instanceof Map)
    Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)))
  return Object.assign(result, ...Object.keys(obj).map(
    key => ({ [key]: deepClone(obj[key], hash) })))
}