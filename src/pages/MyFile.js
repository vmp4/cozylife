import React, { useState, useEffect } from 'react'
import { Col, Container } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { withRouter } from 'react-router-dom'

function MyFile(props) {
  // const userid = props.match.params.CustomerID
  // const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [CustomerID, setCustomerID] = useState('')
  const [CustomerName, setCustomerName] = useState('')
  const [CustomerSex, setCustomerSex] = useState('')
  const [CustomerUsername, setCustomerUsername] = useState('')
  const [CustomerBirthday, setCustomerBirthday] = useState('')
  const [CustomerTel, setCustomerTel] = useState('')
  const [CustomerMail, setCustomerMail] = useState('')
  const [CustomerAdd, setCustomerAdd] = useState('')

  async function getUserFromServer() {
    setLoading(true)

    const url = 'http://localhost:6001/customer/1' // + userid

    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    // const data = dataArr[0]

    // setUser(data)
    setCustomerID(data.CustomerID)
    setCustomerName(data.CustomerName)
    setCustomerSex(data.CustomerSex)
    setCustomerUsername(data.CustomerUsername)
    setCustomerBirthday(data.CustomerBirthday)
    setCustomerTel(data.CustomerTel)
    setCustomerMail(data.CustomerMail)
    setCustomerAdd(data.CustomerAdd)
  }

  async function updateUserToServer() {
    setLoading(true)

    const newData = {
      CustomerID,
      CustomerName,
      CustomerUsername,
      CustomerSex,
      CustomerBirthday,
      CustomerTel,
      CustomerMail,
      CustomerAdd,
    }

    const url = 'http://localhost:6001/customer/' + CustomerID

    const request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    console.log(data)

    setTimeout(() => {
      setLoading(false)
      alert('儲存完成')
    })
  }

  useEffect(() => {
    getUserFromServer()
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

  const display = (
    <>
      <h4>會員ID- {CustomerID}</h4>
      <div className="form-group">
        <div className="form-row">
          <label className="col-md-2">姓名</label>
          <div className="col-md-4">
            <input
              required
              className="form-control"
              type="text"
              placeholder="請輸入姓名"
              value={CustomerName}
              onChange={(event) => {
                setCustomerName(event.target.value)
              }}
              //   plaintext
            />
          </div>
          <div className="invalid-feedback">請輸入姓名。</div>

          <div id="radiotop">
            <div className="mb-3">
              <label className="radio-inline" htmlFor="txt_sex">
                <input
                  type="radio"
                  name="txt_sex"
                  id="txt_sex"
                  value="男"
                  checked={CustomerSex === '男'}
                  onChange={(event) => {
                    setCustomerSex(event.target.value)
                  }}
                />{' '}
                男
              </label>{' '}
              <label className="radio-inline" htmlFor="txt_sex1">
                <input
                  type="radio"
                  name="txt_sex"
                  id="txt_sex1"
                  value="女"
                  checked={CustomerSex === '女'}
                  onChange={(event) => {
                    setCustomerSex(event.target.value)
                  }}
                />{' '}
                女
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="form-row">
          <label className="col-md-2">帳號</label>
          <div className="col-md-4">
            <input
              required
              type="text"
              value={CustomerUsername}
              className="form-control-plaintext"
              readOnly
              disabled
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="form-row">
          <label className="col-md-2">生日</label>
          <div className="col-md-4">
            <input
              type="text"
              placeholder="請輸入生日日期"
              className="form-control-plaintext"
              value={CustomerBirthday}
              required
              onChange={(event) => {
                setCustomerBirthday(event.target.value)
              }}
            />
          </div>
          <div className="invalid-feedback">欄位請勿空白。</div>
        </div>
      </div>

      <div className="form-group">
        <div className="form-row">
          <label className="col-md-2">手機</label>
          <div className="col-md-4">
            <input
              type="text"
              placeholder="請輸入手機號碼"
              className="form-control-plaintext"
              value={CustomerTel}
              required
              onChange={(event) => {
                setCustomerTel(event.target.value)
              }}
            />
          </div>
          <div className="invalid-feedback">欄位請勿空白。</div>
        </div>
      </div>

      <div className="form-group">
        <div className="form-row">
          <label className="col-md-2">信箱</label>
          <div className="col-md-4">
            <input
              type="email"
              placeholder="請輸入電子信箱"
              className="form-control-plaintext"
              value={CustomerMail}
              required
              onChange={(event) => {
                setCustomerMail(event.target.value)
              }}
            />
          </div>
          <div className="invalid-feedback">欄位請勿空白。</div>
        </div>
      </div>

      <div className="form-group">
        <div className="form-row">
          <label className="col-md-2">地址</label>
          <Col sm="8">
            <input
              type="text"
              placeholder="請輸入地址"
              className="form-control-plaintext"
              value={CustomerAdd}
              required
              onChange={(event) => {
                setCustomerAdd(event.target.value)
              }}
            />
          </Col>
          <div className="invalid-feedback">欄位請勿空白。</div>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => {
          updateUserToServer()
        }}
      >
        確認修改
      </button>
    </>
  )

  return (
    <>
      <Container id="filetop">{loading ? spinner : display}</Container>
    </>
  )
}

export default withRouter(MyFile)
