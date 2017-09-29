export function setCPUUsage(cpuUsage) {
  return { type: 'CPU', payload: cpuUsage }
}
export function setRAMUsage(ramUsage) {
  return { type: 'RAM', payload: ramUsage }
}
export function setDISKUsage(diskUsage) {
  return { type: 'DISK', payload: diskUsage }
}
export function addResponseTime(responseTime) {
  return { type: 'ADD_RESPONSE_TIME', payload: responseTime }
}

export function setAverageSessionTime(averageTime) {
  return { type: 'SET_AVERAGE_SESSION_TIME', payload: averageTime }
}
export function setUsersOnlineNow(onlineNow) {
  return { type: 'SET_ONLINE_NOW', payload: onlineNow }
}
export function setLongestSession(longestSessionTime) {
  return { type: 'SET_LONGEST_SESSION', payload: longestSessionTime }
}
export function setTotalSessions(totalSessions) {
  return { type: 'SET_TOTAL_SESSIONS', payload: totalSessions }
}
export function setLiveUsers(live) {
  return { type: 'SET_LIVE_USERS', payload: live }
}

export function setTotalUsers(totalUsers) {
  return { type: 'SET_TOTAL_USERS', payload: totalUsers }
}
export function setTrackedUsers(trackedUsers) {
  return { type: 'SET_TRACKED_USERS', payload: trackedUsers }
}
export function setActiveUsers(activeUsers) {
  return { type: 'SET_ACTIVE_USERS', payload: activeUsers }
}
export function setDisplayedUsers(displayedUsers) {
  return { type: 'SET_DISPLAYED_USERS', payload: displayedUsers }
}

export function setOssStats(stats) {
  return { type: 'SET_OSS_STATS', payload: stats }

}