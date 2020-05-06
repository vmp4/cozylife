import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import { Container, Col, Button } from 'react-bootstrap'
import { BrowserRouter as Router } from 'react-router-dom'

function MyFileChangePass() {
  const [validated, setValidated] = useState(false)
  const [CustomerPassword, setCustomerPassword] = useState([])

  useEffect(() => {}, [])

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  return (
    <>
      <Router>
        <Container id="filetop">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustomname">
              <Form.Label column sm="4">
                請輸入原本密碼：
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  required
                  type="text"
                  placeholder="請輸入密碼"
                  //   plaintext
                />
              </Col>
            </Form.Group>

            <Form.Group controlId="validationCustomname">
              <Form.Label column sm="4">
                輸入新密碼：
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  required
                  type="text"
                  placeholder="請輸入新密碼"
                  //   plaintext
                />
              </Col>
            </Form.Group>

            <Form.Group controlId="validationCustomname">
              <Form.Label column sm="4">
                確認新密碼：
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  required
                  type="text"
                  placeholder="請再次輸入新密碼"
                  //   plaintext
                />
              </Col>
            </Form.Group>

            <Button type="submit">確認修改</Button>
          </Form>
        </Container>
      </Router>
    </>
  )
}

export default MyFileChangePass
