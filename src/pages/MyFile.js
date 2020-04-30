import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import { Col, Button, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { BrowserRouter as Router } from 'react-router-dom'

function MyFile() {
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])

  useEffect(() => {
    setLoading(true)
    const newUser = localStorage.getItem('user') || '[]'
    console.log(JSON.parse(newUser))
    setUser(JSON.parse(newUser))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const spinner = (
    <>
      <div className="d-flex justify-content-center" id="loadfile">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </>
  )

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  const display = (
    <>
      {user.map((value, index) => {
        return <h4 key={index}>會員ID- {value.CustomerID}</h4>
      })}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="validationCustomname">
          <Form.Label column sm="4">
            姓名
          </Form.Label>
          <Col sm="4">
            {user.map((value, index) => {
              return (
                <Form.Control
                  key={index}
                  required
                  type="text"
                  placeholder="請輸入姓名"
                  defaultValue={value.CustomerName}
                  //   plaintext
                />
              )
            })}
          </Col>
          <Form.Control.Feedback type="invalid">
            請輸入姓名。
          </Form.Control.Feedback>

          <div id="radiotop">
            {user.map((value, index) => {
              if (value.CustomerSex === '男') {
                return (
                  <div className="mb-3" key={index}>
                    <Form.Check
                      inline
                      label="男"
                      type="radio"
                      id="custom-inline-radio"
                      name="inlineRadioOptions"
                      defaultChecked
                    />
                    <Form.Check
                      inline
                      label="女"
                      type="radio"
                      id="custom-inline-radio"
                      name="inlineRadioOptions"
                    />
                  </div>
                )
              } else {
                return (
                  <div className="mb-3" key={index}>
                    <Form.Check
                      inline
                      label="男"
                      type="radio"
                      id="custom-inline-radio"
                      name="inlineRadioOptions"
                    />
                    <Form.Check
                      inline
                      label="女"
                      type="radio"
                      id="custom-inline-radio"
                      name="inlineRadioOptions"
                      defaultChecked
                    />
                  </div>
                )
              }
            })}
          </div>
        </Form.Group>

        <Form.Group as={Row} controlId="validationCustomUsername">
          <Form.Label column sm="4">
            帳號
          </Form.Label>
          <Col sm="6">
            {user.map((value, index) => {
              return (
                <Form.Control
                  key={index}
                  required
                  type="text"
                  placeholder=""
                  defaultValue={value.CustomerUsername}
                  plaintext
                  readOnly
                  disabled
                />
              )
            })}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="validationCustomTel">
          <Form.Label column sm="4">
            生日
          </Form.Label>
          <Col sm="6">
            {user.map((value, index) => {
              return (
                <Form.Control
                  key={index}
                  type="text"
                  placeholder="請輸入手機號碼"
                  aria-describedby="inputPhoneNumber"
                  defaultValue={value.CustomerBirthday}
                  plaintext
                  required
                />
              )
            })}
          </Col>
          <Form.Control.Feedback type="invalid">
            欄位請勿空白。
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Row} controlId="validationCustomTel">
          <Form.Label column sm="4">
            手機
          </Form.Label>
          <Col sm="6">
            {user.map((value, index) => {
              return (
                <Form.Control
                  key={index}
                  type="text"
                  placeholder="請輸入手機號碼"
                  aria-describedby="inputPhoneNumber"
                  defaultValue={value.CustomerTel}
                  plaintext
                  required
                />
              )
            })}
          </Col>
          <Form.Control.Feedback type="invalid">
            欄位請勿空白。
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Row} controlId="validationCustomerMail">
          <Form.Label column sm="4">
            信箱
          </Form.Label>
          <Col sm="6">
            {user.map((value, index) => {
              return (
                <Form.Control
                  key={index}
                  type="text"
                  placeholder="請輸入電子信箱"
                  aria-describedby="inputEmail"
                  defaultValue={value.CustomerMail}
                  plaintext
                  required
                />
              )
            })}
          </Col>
          <Form.Control.Feedback type="invalid">
            欄位請勿空白。
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Row} controlId="validationCustomerAdd">
          <Form.Label column sm="4">
            地址
          </Form.Label>
          <Col sm="8">
            {user.map((value, index) => {
              return (
                <Form.Control
                  key={index}
                  type="text"
                  placeholder="請輸入地址"
                  defaultValue={value.CustomerAdd}
                  plaintext
                  required
                />
              )
            })}
          </Col>
          <Form.Control.Feedback type="invalid">
            欄位請勿空白。
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">確認修改</Button>
      </Form>
    </>
  )

  return (
    <>
      <Router id="filetop">{loading ? spinner : display}</Router>
    </>
  )
}

export default MyFile
