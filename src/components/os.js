import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Doughnut } from "react-chartjs-2"
import {
  Card,
  CardHeader,
  CardTitle,
  CardText,
  CardBlock,
  Button,
  Row,
  Col,
  Table
} from 'reactstrap'

class OS extends Component {

  randomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
  }

  render() {
    const osDatas = {
      labels: this.props.oss.labels,
      datasets: [
        {
          backgroundColor: this.props.oss.labels.map(val => this.randomColor()),
          data: this.props.oss.datas
        }
      ]
    }

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='12' sm='12' md='6'>
            <Card>
              <CardHeader>Version usage</CardHeader>
              <CardBlock className='card-body'>
                <div className="chart-wrapper">
                  <Doughnut
                    legend={{ display: false }}
                    data={osDatas}
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
          <Col xs='12' sm='12' md='6'>
            <Card>
              <CardHeader>OS list</CardHeader>
              <CardBlock className='card-body p-0'>
                <Table striped bordered className='m-0'>
                  <tbody>
                    {
                      this.props.oss.labels.map((label, index) => (
                        <tr key={index}>
                          <td>{label}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
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
    oss: state.StatsReducer.oss
  }
}

export default connect(mapStateToProps)(OS)
