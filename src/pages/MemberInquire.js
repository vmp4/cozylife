import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import { FaAngleLeft } from 'react-icons/fa'

function MemberInquire(props) {
  const [key, setKey] = useState('odd')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [orderDetail, setOrderDetail] = useState([])
  // const [orderID, setOrderID] = useState('')
  // const [orderDate, setOrderDate] = useState('')
  // const [shippedTel, setShippedTel] = useState('')
  // const [shippedAdd, setShippedAdd] = useState('')
  // const [requireDate, setRequireDate] = useState('')
  // const [shippedDate, setShippedDate] = useState('')
  // const [unitTotalPrice, setUnitTotalPrice] = useState('')
  // const [discouTotalPrice, setDiscouTotalPrice] = useState('')

  // 從後端提取訂單資料
  async function getUserOrderFromServer() {
    setLoading(true)

    const url = 'http://localhost:7777/order' // + userid

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

    // // setDetail(data)
    // setOrderID(data.orderID)
    // setOrderDate(data.orderDate)
    // setShippedTel(data.shippedTel)
    // setShippedAdd(data.shippedAdd)
    // setRequireDate(data.requireDate)
    // setShippedDate(data.shippedDate)
    // setUnitTotalPrice(data.unitTotalPrice)
    // setDiscouTotalPrice(data.discouTotalPrice)
  }

  useEffect(() => {
    getUserOrderFromServer()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const spinner = (
    <>
      <div className="d-flex justify-content-center" id="loadinquire">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </>
  )

  // 刪除完成Modal用設定
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  // <div class="col-xs-6 col-sm-6 col-md-2">

  // </div>
  // <div class="col-xs-6 col-sm-6 col-md-2">

  // </div>
  // <div class="col-xs-6 col-sm-6 col-md-2">

  // </div>
  // <div class="col-xs-6 col-sm-6 col-md-2">

  // </div>
  // <div class="col-xs-6 col-sm-6 col-md-2">

  // </div>
  // <div class="col-xs-6 col-sm-6 col-md-2">

  // </div>

  const display = (
    <>
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
        <tbody>
          {orderDetail.map((index) => {
            return (
              <>
                <tr key={index}>
                  <td>{index.orderID}</td>
                  <td>{Date(index.orderDate)}</td>
                  <td>已送達</td>
                  <td>{index.unitTotalPrice}</td>
                  <td>已付款</td>
                  <td>
                    <p
                      onClick={() => {
                        handleShow()
                      }}
                    >
                      點此查看明細
                    </p>
                  </td>
                </tr>
                <Modal
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
                </Modal>
              </>
            )
          })}
        </tbody>
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
            <Container id="filetop">{loading ? spinner : display}</Container>
            {/* <MyFile /> */}
          </Tab>
          <Tab eventKey="cqa" title="問答">
            {/* <Container id="filetop">{loading ? spinner : display2}</Container> */}
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
    </>
  )
}

export default withRouter(MemberInquire)
