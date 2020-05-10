import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
// import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
// import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import { FaAngleLeft } from 'react-icons/fa'
import $ from 'jquery'

function MemberInquire(props) {
  const [key, setKey] = useState('odd')
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState([])
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

    const userName = JSON.parse(localStorage.getItem('user')) || []
    // console.log(userName)
    setUserName(userName[0].CustomerName)

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

  // 訂單狀態
  const orderList = (
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
            <tbody key={index.id}>
              <tr>
                <td>{index.orderID}</td>
                <td>{index.orderDate}</td>
                <td>
                  {new Date(index.shippedDate) < new Date()
                    ? '已送達'
                    : '寄送中'}
                </td>
                <td>{index.unitTotalPrice}</td>
                <td>已付款</td>
                <td>
                  <p
                    key={index.id}
                    onClick={(e) => {
                      // console.log(e.currentTarget.getAttribute('key'))
                      // console.log($(e.currentTarget).attr('key'))
                      // console.log($('#dodo').val())
                      // {
                      //   e.target.click    ?
                      setShowDetail(true)
                      //     : setShowDetail(false)
                      // }
                    }}
                  >
                    點此查看明細
                  </p>
                </td>
              </tr>
            </tbody>
            {showDetail ? (
              <tbody key={index.id}>
                <tr>
                  <td colSpan="3" style={{ backgroundColor: 'white' }}>
                    訂單編號：{index.orderID}
                  </td>
                  <td colSpan="3" style={{ backgroundColor: 'white' }}>
                    顧客姓名：{userName}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" style={{ backgroundColor: 'white' }}>
                    訂單日期：{index.orderDate}
                  </td>
                  <td colSpan="3" style={{ backgroundColor: 'white' }}>
                    出貨日期：{index.requireDate}
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
                    {index.discouTotalPrice
                      ? index.discouTotalPrice
                      : '沒有使用折扣'}
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
  )

  // 有訂單就顯示訂單狀態 沒有就顯示沒有訂單紀錄
  const display = (
    <>
      {orderDetail.length === 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <td style={{ backgroundColor: 'white' }}>目前沒有訂單紀錄</td>
            </tr>
          </thead>
        </Table>
      ) : (
        orderList
      )}
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
          {/* <Tab eventKey="cqa" title="問答">
            <Container id="requiretop">{loading ? spinner : display2}</Container>
            <MyFileChangePass />
          </Tab>
          <Tab eventKey="ri" title={<>退貨查詢</>} disabled></Tab> */}
          <Tab
            title={
              <>
                <FaAngleLeft />
                {'訂單列表'}
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
