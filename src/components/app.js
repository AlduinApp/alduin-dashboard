import React, { Component } from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'

import Header from './header'
import Sidebar from './sidebar'
import Breadcrumb from './breadcrumb'
import Aside from './aside'
import Footer from './footer'
import Dashboard from './dashboard'
import Sessions from './sessions'
import Users from './users'
import OS from './os'
import DataTrunk from './data-trunk'

@withRouter
class App extends Component {
  render() {

    if (localStorage.getItem('alduin:pass-key') == null)
      return <Redirect to='/login' />

    return (
      <div className="app">
        <DataTrunk>
          <Header {...this.props} />
          <div className="app-body">
            <Sidebar {...this.props} />
            <main className="main">
              <Breadcrumb />
              <Container fluid>
                <Switch>
                  <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                  <Route path="/sessions" name="Sessions" component={Sessions} />
                  <Route path="/users" name="Users" component={Users} />
                  <Route path="/os" name="OS" component={OS} />
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Container>
            </main>
            <Aside />
          </div>
          <Footer />
        </DataTrunk>
      </div>
    )
  }
}

export default App
