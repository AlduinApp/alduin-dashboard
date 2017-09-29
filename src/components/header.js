import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap'

@withRouter
class Header extends Component {

  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }

  sidebarToggle(e) {
    e.preventDefault()
    document.body.classList.toggle('sidebar-hidden')
  }

  sidebarMinimize(e) {
    e.preventDefault()
    document.body.classList.toggle('sidebar-minimized')
  }

  mobileSidebarToggle(e) {
    e.preventDefault()
    document.body.classList.toggle('sidebar-mobile-show')
  }

  asideToggle(e) {
    e.preventDefault()
    document.body.classList.toggle('aside-menu-hidden')
  }

  logout(){
    localStorage.removeItem('alduin:pass-key')
    this.props.history.push('/dashboard')
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>☰</NavbarToggler>
        <div className='pl-4 mr-5' style={
          {
            display: 'flex',
            flexDirection: 'row'
          }
        }>
          <div style={
            {
              width: '35px',
              height: '35px',
              backgroundImage: 'url(https://avatars0.githubusercontent.com/u/31671127?v=4&s=200)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '35px'
            }
          }></div>
          <div style={{ lineHeight: '35px', }} className='ml-2 font-xl'>Alduin</div>
        </div>
        <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>☰</NavbarToggler>
        <ul className='nav navbar-nav ml-auto'>
          <li className='nav-item hidden-md-down' onClick={this.logout}>
            <a className='nav-link'>
              <i className='icon-logout'></i>
            </a>
          </li>
        </ul>
      </header>
    )
  }
}

export default Header
