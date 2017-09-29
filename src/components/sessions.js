import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import {
  Card,
  CardTitle,
  CardText,
  CardBlock,
  Row,
  Col
} from 'reactstrap'
import * as humanize from 'humanize'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'
import {
  Tooltip,
  actions,
} from 'redux-tooltip'
import { scaleLinear } from "d3-scale"


const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto',
}

const { show, hide } = actions

class Sessions extends Component {

  constructor() {
    super()

    this.handleMove = this.handleMove.bind(this)
    this.handleLeave = this.handleLeave.bind(this)

    this.lastRender = Date.now()
  }

  handleMove(geography, evt) {
    const x = evt.clientX - 230
    const y = evt.clientY
    this.props.dispatch(
      show({
        origin: { x, y },
        content: `${this.props.liveOnlineUsers[geography.properties.code] || 0} online in ${geography.properties.name}`,
      })
    )
  }

  handleLeave() {
    this.props.dispatch(hide())
  }

  render() {
    const ordered = [...Object.values(this.props.liveOnlineUsers)].sort((a, b) => b - a)
    this.colorScale = scaleLinear()
      .domain([0, ordered[ordered.length - 1] || 0])
      .range(["#00ddff", "#006293"])

    const shouldRender = Date.now() - this.lastRender > 5000
    if (shouldRender)
      this.lastRender = Date.now()

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col lg={3}>
            <Card>
              <CardBlock className='card-block'>
                <div className='h1 text-muted text-right mb-2'>
                  <i className='icon-speedometer'></i>
                </div>
                <CardTitle className='mb-0'>{new Date(this.props.averageSessionTime * 1000).toISOString().substr(11, 8)}</CardTitle>
                <small className='text-muted text-uppercase font-weight-bold'>Average session time</small>
                <div className='progress progress-xs mt-1 mb-0'>
                  <div className='progress-bar bg-danger' role='progressbar' style={{ width: '25%' }} aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>
                </div>
              </CardBlock>
            </Card>
          </Col>
          <Col lg={3}>
            <Card>
              <CardBlock className='card-block'>
                <div className='h1 text-muted text-right mb-2'>
                  <i className='icon-people'></i>
                </div>
                <CardTitle className='mb-0'>{this.props.onlineNow}</CardTitle>
                <small className='text-muted text-uppercase font-weight-bold'>Users online now</small>
                <div className='progress progress-xs mt-1 mb-0'>
                  <div className='progress-bar bg-danger' role='progressbar' style={{ width: '25%' }} aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>
                </div>
              </CardBlock>
            </Card>
          </Col>
          <Col lg={3}>
            <Card>
              <CardBlock className='card-block'>
                <div className='h1 text-muted text-right mb-2'>
                  <i className='icon-trophy'></i>
                </div>
                <CardTitle className='mb-0'>{new Date(this.props.longestSession * 1000).toISOString().substr(11, 8)}</CardTitle>
                <small className='text-muted text-uppercase font-weight-bold'>Longest session</small>
                <div className='progress progress-xs mt-1 mb-0'>
                  <div className='progress-bar bg-danger' role='progressbar' style={{ width: '25%' }} aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>
                </div>
              </CardBlock>
            </Card>
          </Col>
          <Col lg={3}>
            <Card>
              <CardBlock className='card-block'>
                <div className='h1 text-muted text-right mb-2'>
                  <i className='icon-paper-plane'></i>
                </div>
                <CardTitle className='mb-0'>{humanize.numberFormat(this.props.totalSessions, 2, '.', '\'')}</CardTitle>
                <small className='text-muted text-uppercase font-weight-bold'>Total sessions</small>
                <div className='progress progress-xs mt-1 mb-0'>
                  <div className='progress-bar bg-danger' role='progressbar' style={{ width: '25%' }} aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>
                </div>
              </CardBlock>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs='12' sm='12' md='12'>
            <Card style={{ background: 'rgb(80, 80, 80)' }} className='p-2'>
              <CardBlock className='card-body text-white'>
                <CardTitle>Live online users</CardTitle>
                <div style={wrapperStyles}>
                  <ComposableMap
                    projectionConfig={{
                      scale: 205,
                      rotation: [-11, 0, 0],
                    }}
                    width={980}
                    height={551}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  >
                    <ZoomableGroup center={[0, 20]} disablePanning>
                      <Geographies disableOptimization={shouldRender} geographyUrl='http://localhost:4000/world-map'>
                        {(geographies, projection) => geographies.map((geography, i) => geography.id !== 'ATA' && (
                          <Geography
                            key={i}
                            geography={geography}
                            projection={projection}
                            onMouseMove={this.handleMove}
                            onMouseLeave={this.handleLeave}
                            style={{
                              default: {
                                fill: this.colorScale(this.props.liveOnlineUsers[geography.properties.code] || 0),
                                stroke: '#607D8B',
                                strokeWidth: 0.75,
                                outline: 'none',
                              },
                              hover: {
                                fill: '#607D8B',
                                stroke: '#607D8B',
                                strokeWidth: 0.75,
                                outline: 'none',
                              },
                              pressed: {
                                fill: '#FF5722',
                                stroke: '#607D8B',
                                strokeWidth: 0.75,
                                outline: 'none',
                              },
                            }}
                          />
                        ))}
                      </Geographies>
                    </ZoomableGroup>
                  </ComposableMap>
                  <Tooltip />
                </div>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    averageSessionTime: state.StatsReducer.sessions.averageSessionTime,
    onlineNow: state.StatsReducer.sessions.onlineNow,
    longestSession: state.StatsReducer.sessions.longestSession,
    totalSessions: state.StatsReducer.sessions.totalSessions,
    liveOnlineUsers: state.StatsReducer.sessions.liveOnlineUsers
  }
}

export default connect(mapStateToProps)(Sessions)
