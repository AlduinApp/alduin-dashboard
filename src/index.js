import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import 'font-awesome/css/font-awesome.min.css'
import 'simple-line-icons/css/simple-line-icons.css'
import '../scss/style.scss'

import App from './components/app'
import Login from './components/login'

import reducers from './reducers'

const history = createBrowserHistory()

const store = createStore(reducers)

ReactDOM.render((
  <Provider store={store}>
    <HashRouter history={history}>
      <Switch>
        <Route path='/login' name='Login' component={Login} />
        <Route path="/" name="Home" component={App} />
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'))
