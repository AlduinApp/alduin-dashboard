import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { socket } from '../socket'

import {
  setCPUUsage,
  setRAMUsage,
  setDISKUsage,
  addResponseTime,
  setAverageSessionTime,
  setUsersOnlineNow,
  setLongestSession,
  setTotalSessions,
  setLiveUsers,
  setTotalUsers,
  setTrackedUsers,
  setActiveUsers,
  setOssStats
} from '../actions/stats-actions'

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setCPUUsage,
    setRAMUsage,
    setDISKUsage,
    addResponseTime,
    setAverageSessionTime,
    setUsersOnlineNow,
    setLongestSession,
    setTotalSessions,
    setLiveUsers,
    setTotalUsers,
    setTrackedUsers,
    setActiveUsers,
    setOssStats
  }, dispatch)
}

class DataTrunk extends Component {
  componentDidMount() {
    socket.on('connect', () => {
      console.log('Socket connected !')

      socket.emit('auth', localStorage.getItem('alduin:pass-key'))
      setTimeout(() => {
        socket.emit('get-users', { page: 1 })
      }, 2000)
    })
    socket.on('disconnect', () => {
      console.log('Socket disconnected !')
    })

    socket.on('cpuUsage', this.props.setCPUUsage)
    socket.on('ramUsage', this.props.setRAMUsage)
    socket.on('diskUsage', this.props.setDISKUsage)
    socket.on('responseTime', this.props.addResponseTime)

    socket.on('averageSessionTime', this.props.setAverageSessionTime)
    socket.on('usersOnlineNow', this.props.setUsersOnlineNow)
    socket.on('longestSession', this.props.setLongestSession)
    socket.on('totalSessions', this.props.setTotalSessions)
    socket.on('liveUsers', this.props.setLiveUsers)

    socket.on('totalUsers', this.props.setTotalUsers)
    socket.on('trackedUsers', this.props.setTrackedUsers)
    socket.on('activeUsers', this.props.setActiveUsers)
    socket.on('displayedUsers', this.props.setDisplayedUsers)

    socket.on('ossStats', this.props.setOssStats)
  }

  render() {
    return <div>{this.props.children}</div>
  }
}
export default connect(null, mapDispatchToProps)(DataTrunk)