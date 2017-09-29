import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Bar, Doughnut, Line } from "react-chartjs-2"
import {
  Card,
  CardHeader,
  CardTitle,
  CardText,
  CardBlock,
  Button,
  Row,
  Col
} from 'reactstrap'
import * as humanize from 'humanize'

class Dashboard extends Component {

  render() {
    const cpuDatas = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8].map(value => `CPU #${value}`),
      datasets: [
        {
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          data: this.props.cpuDatas
        }
      ]
    }
    const ramDatas = {
      labels: ['Used', 'Free'],
      datasets: [
        {
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)'],
          data: [this.props.ramDatas.used, this.props.ramDatas.free]
        }
      ]
    }
    const diskDatas = {
      labels: ['Used', 'Free'],
      datasets: [
        {
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)'],
          data: [this.props.diskDatas.used, this.props.diskDatas.free]
        }
      ]
    }
    const apiResponseDatas = {
      labels: this.props.responseTimes.map((v,i) => ''),
      datasets: [
        {
          fill: false,
          backgroundColor: ['rgb(255, 99, 132)'],
          data: this.props.responseTimes
        }
      ]
    }

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='12' sm='12' md='4'>
            <Card>
              <CardHeader>CPU usage</CardHeader>
              <CardBlock className='card-body'>
                <div className="chart-wrapper">
                  <Bar
                    legend={{ display: false }}
                    data={cpuDatas}
                    width={100}
                    height={50}
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        yAxes: [{
                          ticks: {
                            max: 100,
                            beginAtZero: true
                          }
                        }]
                      }
                    }}
                  />
                </div>
              </CardBlock>
            </Card>
          </Col>
          <Col xs='12' sm='6' md='4'>
            <Card>
              <CardHeader>RAM usage ({humanize.filesize(this.props.ramDatas.used)} / {humanize.filesize(this.props.ramDatas.used + this.props.ramDatas.free)})</CardHeader>
              <CardBlock className='card-body'>
                <div className="chart-wrapper">
                  <Doughnut
                    legend={{ display: false }}
                    data={ramDatas}
                    width={100}
                    height={50}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </CardBlock>
            </Card>
          </Col>
          <Col xs='12' sm='6' md='4'>
            <Card>
              <CardHeader>Disk usage ({humanize.filesize(this.props.diskDatas.used)} / {humanize.filesize(this.props.diskDatas.used + this.props.diskDatas.free)})</CardHeader>
              <CardBlock className='card-body'>
                <div className="chart-wrapper">
                  <Doughnut
                    legend={{ display: false }}
                    data={diskDatas}
                    width={100}
                    height={50}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </CardBlock>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs='12'>
            <Card>
              <CardHeader>API response time</CardHeader>
              <CardBlock className='card-body'>
                <div className="chart-wrapper" style={{ height: '300px' }}>
                  <Line
                    legend={{ display: false }}
                    data={apiResponseDatas}
                    width={100}
                    height={50}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
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
    cpuDatas: state.StatsReducer.dashboard.cpuUsage,
    ramDatas: state.StatsReducer.dashboard.ramUsage,
    diskDatas: state.StatsReducer.dashboard.diskUsage,
    responseTimes: state.StatsReducer.dashboard.responseTimes
  }
}

export default connect(mapStateToProps)(Dashboard)
