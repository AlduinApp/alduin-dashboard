const defaultState = {
  dashboard: {
    cpuUsage: [],
    ramUsage: {
      free: 0,
      used: 0
    },
    diskUsage: {
      free: 0,
      used: 0
    },
    responseTimes: []
  },
  sessions: {
    averageSessionTime: 0,
    onlineNow: 0,
    longestSession: 0,
    totalSessions: 0,
    liveOnlineUsers: {}
  },
  users: {
    totalUsers: 0,
    trackedUsers: 0,
    activeUsers: 0,
    displayedUsers: []
  },
  oss: {
    labels: [],
    datas: []
  }
}

export default function (state = defaultState, action) {
  const newState = deepClone(state)
  switch (action.type) {
    // Dashboard
    case 'CPU':
      newState.dashboard.cpuUsage = action.payload
      break
    case 'RAM':
      newState.dashboard.ramUsage = action.payload
      break
    case 'DISK':
      newState.dashboard.diskUsage = action.payload
      break
    case 'ADD_RESPONSE_TIME':
      newState.dashboard.responseTimes.push(action.payload)
      break

    // Sessions
    case 'SET_AVERAGE_SESSION_TIME':
      newState.sessions.averageSessionTime = action.payload
      break
    case 'SET_ONLINE_NOW':
      newState.sessions.onlineNow = action.payload
      break
    case 'SET_LONGEST_SESSION':
      newState.sessions.longestSession = action.payload
      break
    case 'SET_TOTAL_SESSIONS':
      newState.sessions.totalSessions = action.payload
      break
    case 'SET_LIVE_USERS':
      newState.sessions.liveOnlineUsers = action.payload
      break

    // Users
    case 'SET_TOTAL_USERS':
      newState.users.totalUsers = action.payload
      break
    case 'SET_TRACKED_USERS':
      newState.users.trackedUsers = action.payload
      break
    case 'SET_ACTIVE_USERS':
      newState.users.activeUsers = action.payload
      break
    case 'SET_DISPLAYED_USERS':
      newState.users.displayedUsers = action.payload
      break

    // OS
    case 'SET_OSS_STATS':
      console.log(action.payload)
      newState.oss = action.payload
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