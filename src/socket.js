import io from 'socket.io-client'

const socket = io('http://alduin.stouder.io:4000')
module.exports = { socket }