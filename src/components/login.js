import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Doughnut } from "react-chartjs-2"
import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardText,
  CardBlock,
  CardGroup,
  Button,
  Row,
  Col,
  Table,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'

@withRouter
class Login extends Component {

  constructor(props) {
    super(props)

    this.enterPassKey = this.enterPassKey.bind(this)
  }

  enterPassKey(e) {
    localStorage.setItem('alduin:pass-key', document.getElementById('password-input').value)
    this.props.history.push('/dashboard')
  }

  render() {
    return (
      <div className='app flex-row align-items-center'>
        <Container>
          <Row className='justify-content-center'>
            <Col md={4}>
              <CardGroup className='mb-0'>
                <Card className='p-2'>
                  <CardBlock>
                    <h1>Login</h1>
                    <p className='text-muted'>Enter the pass key</p>
                    <InputGroup className='mb-1'>
                      <InputGroupAddon>
                        <i className='icon-lock'></i>
                      </InputGroupAddon>
                      <Input type='password' id='password-input' className='form-control' placeholder='Pass key' />
                    </InputGroup>
                    <Row>
                      <Col md={12} className='text-right'>
                        <Button type='submit' color='primary' className='px-5' onClick={this.enterPassKey}>Enter</Button>
                      </Col>
                    </Row>
                  </CardBlock>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Login
