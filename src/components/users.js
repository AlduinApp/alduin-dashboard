import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBlock,
  Row,
  Col,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input

} from 'reactstrap'

import { socket } from '../socket'
import { setPages, displayPage } from '../actions/ui-actions'
import { setDisplayedUsers } from '../actions/stats-actions'

class Users extends Component {

  constructor() {
    super()

    this._changePage = this._changePage.bind(this)

    socket.on('page-nbre', data => {
      this.props.setPages(Math.ceil(data))
    })
    socket.emit('page-nbre')

    socket.on('selected-page', data => {
      this.props.displayPage(data.page)
      this.props.setDisplayedUsers(data.users)
    })
  }

  _changePage(e) {
    const page = Number(e.target.innerHTML) - 1

    socket.emit('select-page', page)
  }

  render() {
    return (
      <div className='animated fadeIn'>
        <Row>
          <Col lg={4}>
            <Card>
              <CardBlock className="card-block">
                <div className="h1 text-muted text-right mb-2">
                  <i className="icon-people"></i>
                </div>
                <CardTitle className="mb-0">{this.props.totalUsers}</CardTitle>
                <small className="text-muted text-uppercase font-weight-bold">Total users</small>
                <div className="progress progress-xs mt-1 mb-0">
                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </CardBlock>
            </Card>
          </Col>
          <Col lg={4}>
            <Card>
              <CardBlock className="card-block">
                <div className="h1 text-muted text-right mb-2">
                  <i className="icon-notebook"></i>
                </div>
                <CardTitle className="mb-0">{this.props.trackedUsers}</CardTitle>
                <small className="text-muted text-uppercase font-weight-bold">Tracked users</small>
                <div className="progress progress-xs mt-1 mb-0">
                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </CardBlock>
            </Card>
          </Col>
          <Col lg={4}>
            <Card>
              <CardBlock className="card-block">
                <div className="h1 text-muted text-right mb-2">
                  <i className="icon-user-following"></i>
                </div>
                <CardTitle className="mb-0">{this.props.activeUsers}</CardTitle>
                <small className="text-muted text-uppercase font-weight-bold">Active users (1 month)</small>
                <div className="progress progress-xs mt-1 mb-0">
                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </CardBlock>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>Tracked users (4)</CardHeader>
              <CardBlock className='card-body'>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Country</th>
                      <th>Language</th>
                      <th>OS</th>
                      <th>Since</th>
                      <th>Version</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.displayedUsers.map((user, i) => (
                        <tr key={i}>
                          <td>{user.id}</td>
                          <td>{user.country}</td>
                          <td>{user.locale}</td>
                          <td>{user.os}</td>
                          <td>{new Date(user.creationDate*1000).toString()}</td>
                          <td>{user.version}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag='span' />
                  </PaginationItem>
                  {
                    new Array(this.props.pages).fill('').map((val, index) => (
                      <PaginationItem active={index === this.props.displayedPage} key={index}>
                        <PaginationLink tag='span' onClick={e => this._changePage(e)}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))
                  }
                  <PaginationItem>
                    <PaginationLink next tag='span' />
                  </PaginationItem>
                </Pagination>
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
    totalUsers: state.StatsReducer.users.totalUsers,
    trackedUsers: state.StatsReducer.users.trackedUsers,
    activeUsers: state.StatsReducer.users.activeUsers,
    displayedPage: state.UIReducer.displayedPage,
    pages: state.UIReducer.pages,
    displayedUsers: state.StatsReducer.users.displayedUsers
  }
}
function mapDispatchToProps(dispatch) {
  return dispatch => bindActionCreators({
    setPages,
    displayPage,
    setDisplayedUsers
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Users)
