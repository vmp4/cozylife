import React, { useState, useEffect } from 'react'
import { Col, Container } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { withRouter } from 'react-router-dom'

function MyFile(props) {
  // const userid = props.match.params.CustomerID
  // const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [userID, setUserID] = useState('')
  const [name, setName] = useState('')
  const [sex, setSex] = useState('')
  const [userName, setUserName] = useState('')
  const [birth, setBirth] = useState('')
  const [tel, setTel] = useState('')
  const [mail, setMail] = useState('')
  const [address, setAddress] = useState('')

  async function getUserFromServer() {
    setLoading(true)

    const url = 'http://localhost:6001/customer/1' // + userid

    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    // const data = dataArr[0]

    // setUser(data)
    setUserID(data.CustomerID)
    setName(data.CustomerName)
    setSex(data.CustomerSex)
    setUserName(data.CustomerUsername)
    setBirth(data.CustomerBirthday)
    setTel(data.CustomerTel)
    setMail(data.CustomerMail)
    setAddress(data.CustomerAdd)
  }

  async function updateUserToServer() {
    setLoading(true)

    const newData = { userID, name, userName, sex, birth, tel, mail, address }

    const url = 'http://localhost:6001/customer/1' // + userid

    const request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    })
    console.log(newData)

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
      <h4>會員ID- {userID}</h4>
      <div className="form-group">
        <div className="form-row">
          <label className="col-md-2">姓名</label>
          <div className="col-md-4">
            <input
              required
              className="form-control"
              type="text"
              placeholder="請輸入姓名"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
              }}
              //   plaintext
            />
          </div>
          <div className="invalid-feedback">請輸入姓名。</div>

          {/* <div id="radiotop">
            <div className="mb-3">
              <label className="radio-inline" htmlFor="txt_sex">
                <input
                  type="radio"
                  name="txt_sex"
                  id="txt_sex"
                  value="男"
                  check={sex === '男' ? 'checked' : null}
                  onChange={(event) => {
                    setSex(event.target.value)
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
                  check={sex === '女' ? 'checked' : null}
                  onChange={(event) => {
                    setSex(event.target.value)
                  }}
                />{' '}
                女
              </label> */}
          {/* {sex === '男' ? check1 : check2} */}
          {/* </div>
          </div> */}
        </div>
      </div>

      <div className="form-group">
        <div className="form-row">
          <label className="col-md-2">帳號</label>
          <div className="col-md-4">
            <input
              required
              type="text"
              value={userName}
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
              value={birth}
              required
              onChange={(event) => {
                setBirth(event.target.value)
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
              value={tel}
              required
              onChange={(event) => {
                setTel(event.target.value)
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
              value={mail}
              required
              onChange={(event) => {
                setMail(event.target.value)
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
              value={address}
              required
              onChange={(event) => {
                setAddress(event.target.value)
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
