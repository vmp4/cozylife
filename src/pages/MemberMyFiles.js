import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import { FaAngleLeft } from 'react-icons/fa'
import $ from 'jquery'
// import MyFile from './MyFile'
// import MyFileChangePass from './MyFileChangePass'

function MemberMyFiles(props) {
  const [key, setKey] = useState('cpw')
  const [loading, setLoading] = useState(false)
  const [modalWord, setModalword] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [CustomerID, setCustomerID] = useState('')
  const [CustomerSex, setCustomerSex] = useState('')
  const [CustomerTel, setCustomerTel] = useState('')
  const [CustomerAdd, setCustomerAdd] = useState('')
  const [CustomerName, setCustomerName] = useState('')
  const [CustomerMail, setCustomerMail] = useState('')
  const [CustomerUsername, setCustomerUsername] = useState('')
  const [CustomerBirthday, setCustomerBirthday] = useState('')
  const [CustomerPassword, setCustomerPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [createNewPassword, setCreateNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  // 從後端提取會員資料
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
    setCustomerSex(data.CustomerSex)
    setCustomerTel(data.CustomerTel)
    setCustomerAdd(data.CustomerAdd)
    setCustomerMail(data.CustomerMail)
    setCustomerName(data.CustomerName)
    setCustomerUsername(data.CustomerUsername)
    setCustomerBirthday(data.CustomerBirthday)
    setCustomerPassword(data.CustomerUsername)
  }

  // 會員資料輸出後端修改
  async function updateUserToServer() {
    setLoading(true)

    const newData = {
      CustomerID,
      CustomerSex,
      CustomerTel,
      CustomerAdd,
      CustomerName,
      CustomerMail,
      CustomerUsername,
      CustomerPassword,
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

    // console.log(data)

    setTimeout(() => {
      setLoading(false)
      alert('儲存完成')
    })
  }

  // 密碼輸出後端修改
  async function updatePasswordToServer() {
    setLoading(true)

    const newData = {
      CustomerID,
      CustomerSex,
      CustomerTel,
      CustomerAdd,
      CustomerName,
      CustomerMail,
      CustomerBirthday,
      CustomerUsername,
      CustomerPassword,
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

    // console.log(data)

    setTimeout(() => {
      setLoading(false)
      setModalword('儲存完成。')
      handleShow()
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

  // Modal用設定
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  // 會員詳細資料頁面
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
          <div className="col-md-4">
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
          </div>
          <div className="invalid-feedback">欄位請勿空白。</div>
        </div>
      </div>

      <button
        className="btn btn-secondary"
        onClick={() => {
          updateUserToServer()
        }}
      >
        確認修改
      </button>
    </>
  )

  // 新密碼確認
  function checkSecondPass(value1, value2) {
    if (value1 === '') {
      setModalword('請輸入新密碼！')
      handleShow()
      $('#firstPass').focus()
      return false
    }
    for (let npw = 0; npw < value1.length; npw++) {
      if (value1.charAt(npw) === ' ' || value1.charAt(npw) === '"') {
        setModalword('密碼不可以含有空白或雙引號！')
        handleShow()
        $('#firstPass').focus()
        return false
      }
      if (value1.length <= 2) {
        setModalword('密碼長度必須大於8個字母！')
        handleShow()
        $('#firstPass').focus()
        return false
      }
      if (value2 === '') {
        setModalword('請輸入確認密碼！')
        handleShow()
        $('#secondPass').focus()
        return false
      }
      if (value1 !== value2) {
        setModalword('確認密碼輸入不一樣,請重新輸入！')
        handleShow()
        $('#secondPass').focus()
        return false
      }
    }
    return true
  }

  // 密碼並確認提交
  function handelSubmit() {
    if (confirmPassword === '') {
      setModalword('沒有輸入原本密碼！')
      handleShow()
      $('#oraginPass').focus()
    } else if (CustomerPassword !== confirmPassword) {
      setModalword('原本密碼輸入錯誤！')
      handleShow()
      $('#oraginPass').focus()
      return false
    } else if (!checkSecondPass(createNewPassword, confirmNewPassword)) {
      return false
    } else {
      setCreateNewPwToCustomerPw()
      updatePasswordToServer()
    }
  }

  function setCreateNewPwToCustomerPw() {
    setCustomerPassword(createNewPassword)
    console.log(CustomerPassword)
  }

  // 修改密碼頁面
  const display2 = (
    <>
      <div className="form-group">
        <label className="col-sm-4" style={{ marginLeft: '10px' }}>
          請輸入原本密碼：
        </label>
        <div className="col-md-6">
          <input
            required
            id="oraginPass"
            type="password"
            style={{ padding: '10px' }}
            placeholder="請點此輸入密碼"
            className="form-control-plaintext"
            onChange={(event) => {
              setConfirmPassword(event.target.value)
            }}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-4" style={{ marginLeft: '10px' }}>
          輸入新密碼：
        </label>
        <div className="col-md-6">
          <input
            required
            id="firstPass"
            type="password"
            style={{ padding: '10px' }}
            placeholder="請點此輸入新密碼"
            className="form-control-plaintext"
            onChange={(event) => {
              setCreateNewPassword(event.target.value)
            }}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-4" style={{ marginLeft: '10px' }}>
          確認新密碼：
        </label>
        <div className="col-md-6">
          <input
            required
            id="secondPass"
            type="password"
            style={{ padding: '10px' }}
            placeholder="請點此再次輸入新密碼"
            className="form-control-plaintext"
            onChange={(event) => {
              setConfirmNewPassword(event.target.value)
              // setCustomerPassword(event.target.value)
            }}
          />
        </div>
      </div>

      <button
        style={{ marginLeft: '20px' }}
        className="btn btn-secondary"
        onClick={() => {
          // setCreateNewPwToCustomerPw()
          // updatePasswordToServer()
          handelSubmit()
        }}
      >
        確認修改
      </button>
    </>
  )

  return (
    <>
      <Router>
        <Container id="filetabs">
          <Tabs
            justify
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="mdd" title="會員詳細資料">
              <Container id="filetop">{loading ? spinner : display}</Container>
              {/* <MyFile /> */}
            </Tab>
            <Tab eventKey="cpw" title="修改密碼">
              <Container id="filetop">{loading ? spinner : display2}</Container>
              {/* <MyFileChangePass /> */}
            </Tab>
            <Tab title={<></>} disabled></Tab>
            <Tab
              title={
                <>
                  <FaAngleLeft />
                  {'資料修改'}
                </>
              }
              disabled
            ></Tab>
          </Tabs>
        </Container>
        <Modal
          show={showModal}
          onHide={handleClose}
          {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton style={{ color: 'brown' }}>
            <Modal.Title>哈囉！</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: 'center', color: 'blue' }}>
            {modalWord}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="dark"
              onClick={() => {
                handleClose()
              }}
            >
              確認
            </Button>
          </Modal.Footer>
        </Modal>
      </Router>
    </>
  )
}

export default withRouter(MemberMyFiles)
