import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
// import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
// import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Accordion from 'react-bootstrap/Accordion'
import { FaAngleLeft } from 'react-icons/fa'
import $ from 'jquery'

function MemberInquire(props) {
  const [key, setKey] = useState('odd')
  const [loading, setLoading] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [orderDetail, setOrderDetail] = useState([])
  const [orderID, setOrderID] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [shippedTel, setShippedTel] = useState('')
  const [shippedAdd, setShippedAdd] = useState('')
  const [requireDate, setRequireDate] = useState('')
  const [shippedDate, setShippedDate] = useState('')
  const [unitTotalPrice, setUnitTotalPrice] = useState('')
  const [discouTotalPrice, setDiscouTotalPrice] = useState('')

  // 從後端提取訂單資料
  async function getUserOrderFromServer() {
    setLoading(true)

    const url = 'http://localhost:7777/orderListDetail' // + userid

    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    localStorage.setItem('orderDetail', JSON.stringify(data))
    // const data = dataArr[0]

    const orderDetail = JSON.parse(localStorage.getItem('orderDetail')) || []
    setOrderDetail(orderDetail)

    // setDetail(data)
    setOrderID(orderDetail.orderID)
    setOrderDate(orderDetail.orderDate)
    setShippedTel(orderDetail.shippedTel)
    setShippedAdd(orderDetail.shippedAdd)
    setRequireDate(orderDetail.requireDate)
    setShippedDate(orderDetail.shippedDate)
    setUnitTotalPrice(orderDetail.unitTotalPrice)
    setDiscouTotalPrice(orderDetail.discouTotalPrice)
  }

  useEffect(() => {
    getUserOrderFromServer()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    $()
  }, [showDetail])

  const spinner = (
    <>
      <div className="d-flex justify-content-center" id="loadinquire">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </>
  )

  // 把所有日期以YYYY-MM-DD顯示
  for (let i = 0; i < orderDetail.length; i++) {
    orderDetail[i].orderDate = orderDetail[i].orderDate.split('T')[0]
    orderDetail[i].requireDate = orderDetail[i].requireDate.split('T')[0]
    orderDetail[i].shippedDate = orderDetail[i].shippedDate.split('T')[0]
  }

  // // 刪除完成Modal用設定
  // const handleClose = () => setShowModal(false)
  // const handleShow = () => setShowModal(true)

  const display = (
    <>
      {/* <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <tr>
              <th>訂單編號</th>
              <th>購買日期</th>
              <th>訂單狀態</th>
              <th>訂單金額</th>
              <th>付款狀態</th>
              <th>訂單明細</th>
            </tr>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Click me!
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>購買日期</th>
            <th>訂單狀態</th>
            <th>訂單金額</th>
            <th>付款狀態</th>
            <th>訂單明細</th>
          </tr>
        </thead>
        {orderDetail.map((index) => {
          return (
            <>
              <tbody key={index}>
                <tr>
                  <td>{index.orderID}</td>
                  <td>{index.orderDate}</td>
                  <td>已送達</td>
                  <td>{index.unitTotalPrice}</td>
                  <td>已付款</td>
                  <td>
                    <p
                      onClick={() => {
                        setShowDetail(true)
                      }}
                    >
                      點此查看明細
                    </p>
                  </td>
                </tr>
              </tbody>
              {showDetail ? (
                <tbody key={index}>
                  <tr>
                    <td colSpan="3" style={{ backgroundColor: 'white' }}>
                      訂單編號：{index.orderID}
                    </td>
                    <td colSpan="3" style={{ backgroundColor: 'white' }}>
                      顧客姓名：{index.discountTotalPrice}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" style={{ backgroundColor: 'white' }}>
                      訂單日期：{index.orderDate}
                    </td>
                    <td colSpan="3" style={{ backgroundColor: 'white' }}>
                      收貨日期：{index.requireDate}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" style={{ backgroundColor: 'white' }}>
                      寄送日期：{index.shippedDate}
                    </td>
                    <td colSpan="3" style={{ backgroundColor: 'white' }}>
                      連絡電話：{index.shippedTel}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" style={{ backgroundColor: 'white' }}>
                      購物金額：{index.unitTotalPrice}
                    </td>
                    <td colSpan="3" style={{ backgroundColor: 'white' }}>
                      使用折扣：
                      {
                        (index.discountTotalPrice = null
                          ? '無'
                          : index.discountTotalPrice)
                      }
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5" style={{ backgroundColor: 'white' }}>
                      寄送地址：{index.shippedAdd}
                    </td>
                    <td colSpan="1" style={{ backgroundColor: 'white' }}>
                      <p
                        onClick={() => {
                          setShowDetail(false)
                        }}
                      >
                        點擊關閉
                      </p>
                    </td>
                  </tr>
                </tbody>
              ) : (
                ''
              )}
            </>
          )
        })}
      </Table>
    </>
  )

  return (
    <>
      <Container id="filetabs">
        <Tabs
          justify
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="odd" title="訂單">
            <Container id="requiretop">{loading ? spinner : display}</Container>
            {/* <MyFile /> */}
          </Tab>
          <Tab eventKey="cqa" title="問答">
            {/* <Container id="requiretop">{loading ? spinner : display2}</Container> */}
            {/* <MyFileChangePass /> */}
          </Tab>
          <Tab eventKey="ri" title={<>退貨查詢</>} disabled></Tab>
          <Tab
            title={
              <>
                <FaAngleLeft />
                {'訂單相關'}
              </>
            }
            disabled
          ></Tab>
        </Tabs>
      </Container>
      {/* <Modal
                  show={showModal}
                  onHide={handleClose}
                  // {...props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton style={{ color: 'brown' }}>
                    <Modal.Title>訂單詳細資訊</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    訂單編號：
                    <div className="col-md-6">
                      <input
                        required
                        type="text"
                        value={index.orderID}
                        className="form-control-plaintext"
                        readOnly
                        disabled
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Body>
                    顧客姓名：
                    <div className="col-md-6">
                      <input
                        required
                        type="text"
                        value={index.discountTotalPrice}
                        className="form-control-plaintext"
                        readOnly
                        disabled
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Body>
                    訂單日期：
                    <div className="col-md-6">
                      <input
                        required
                        type="text"
                        value={index.orderDate}
                        className="form-control-plaintext"
                        readOnly
                        disabled
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Body>
                    收貨日期：
                    <div className="col-md-6">
                      <input
                        required
                        type="text"
                        value={index.requireDate}
                        className="form-control-plaintext"
                        readOnly
                        disabled
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Body>
                    寄送日期：
                    <div className="col-md-6">
                      <input
                        required
                        type="text"
                        value={index.shippedDate}
                        className="form-control-plaintext"
                        readOnly
                        disabled
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Body>
                    連絡電話：
                    <div className="col-md-6">
                      <input
                        required
                        type="text"
                        value={index.shippedTel}
                        className="form-control-plaintext"
                        readOnly
                        disabled
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Body>
                    寄送地址：
                    <div className="col-md-6">
                      <input
                        required
                        type="text"
                        value={index.shippedAdd}
                        className="form-control-plaintext"
                        readOnly
                        disabled
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Body>
                    購物金額：
                    <div className="col-md-6">
                      <input
                        required
                        type="text"
                        value={index.unitTotalPrice}
                        className="form-control-plaintext"
                        readOnly
                        disabled
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Body>
                    使用折扣：
                    <div className="col-md-6">
                      <input
                        required
                        type="text"
                        value={
                          (index.discountTotalPrice = null
                            ? '無'
                            : index.discountTotalPrice)
                        }
                        className="form-control-plaintext"
                        readOnly
                        disabled
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleClose()
                      }}
                    >
                      確定
                    </Button>
                  </Modal.Footer>
                </Modal> */}
    </>
  )
}

export default withRouter(MemberInquire)
