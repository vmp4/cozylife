import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import {
  Container,
  Button,
  Pagination,
  // FormControl,
  // InputGroup,
} from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import { FaAngleLeft } from 'react-icons/fa'
// import DiscountPage from './DiscountPage'

function MemberMyDiscount(props) {
  const [key, setKey] = useState('md')
  const [loading, setLoading] = useState(false)
  const [discount, setDiscount] = useState([])
  // const [searchText, setSearchText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [discountPageTotal, setDiscountPageTotal] = useState(1)

  function getDiscountFromLocalStorage() {
    setLoading(true)

    const newDiscount = JSON.parse(localStorage.getItem('discount')) || []
    setDiscount(newDiscount)

    const discountPageTotal = Math.ceil(newDiscount.length / 6)
    setDiscountPageTotal(discountPageTotal)

    if (!props.match.params.page)
      props.history.push('/Member/MemberMyDiscount/page/1')
  }

  function setDeleteDiscountToLocalStorage(value) {
    setLoading(true)
    localStorage.setItem('discount', JSON.stringify(value))
    setDiscount(value)
    setTimeout(() => {
      setLoading(false)
      alert('已刪除')
    })
  }

  useEffect(() => {
    getDiscountFromLocalStorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const spinner = (
    <>
      <div className="d-flex justify-content-center" id="loaddiscount">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </>
  )

  // Modal用設定
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  // Pagination設定
  const pageNow = +props.match.params.page
  const pagePrev = pageNow - 1 ? pageNow - 1 : 1
  const pageNext =
    pageNow + 1 < discountPageTotal ? pageNow + 1 : discountPageTotal

  // 過濾出目前頁面要呈現的資料
  const displayDiscount = discount.filter((item, index) => {
    return index < pageNow * 6 && index >= (pageNow - 1) * 6
  })

  const display = (
    <>
      <Container style={{ padding: '30px' }}>
        <div className="row">
          {displayDiscount.map((value, index) => {
            return (
              <>
                <Card
                  className="col-mb-auto"
                  style={{ width: '15rem' }}
                  key={index}
                >
                  <Card.Header>>折扣編號：{value.discountID}</Card.Header>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>{value.discountName}</Card.Title>
                    <Card.Text>{value.discountEndDate}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleShow()
                      }}
                    >
                      刪除此折扣
                    </Button>
                  </Card.Body>
                </Card>
                <Modal
                  show={showModal}
                  onHide={handleClose}
                  {...props}
                  // size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>折扣編號：{value.discountID}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    確定要刪除「{value.discountName}」折扣？
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      取消刪除
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleClose()
                        discount.splice(value, 1)
                        setDeleteDiscountToLocalStorage(discount)
                      }}
                    >
                      確認刪除
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )
          })}
        </div>
      </Container>
      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() => props.history.push('/Member/MemberMyDiscount/page/1')}
        />
        <Pagination.Prev
          onClick={() =>
            props.history.push('/Member/MemberMyDiscount/page/' + pagePrev)
          }
        />
        {/* <Pagination.Ellipsis /> */}

        <Pagination.Item active>{props.match.params.page}</Pagination.Item>

        {/* <Pagination.Ellipsis /> */}
        <Pagination.Next
          onClick={() =>
            props.history.push('/Member/MemberMyDiscount/page/' + pageNext)
          }
        />
        <Pagination.Last
          onClick={() =>
            props.history.push(
              '/Member/MemberMyDiscount/page/' + discountPageTotal
            )
          }
        />
      </Pagination>
    </>
  )

  // const dates = ["2018-09-12", "2018-10-18", "2018-12-30"];
  // const filteredDates = dates.filter(d => new Date(d) - new Date() > 0);

  // function isBigEnough(value) {
  // return value >= 10;
  // }

  // var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
  // // filtered is [12, 130, 44]

  function dateFilter(discount) {
    return function (x) {
      return (
        (new Date(x.discountEndDate) - new Date() < 7 &&
          new Date(x.discountEndDate) - new Date() > 0) ||
        !discount
      )
    }
  }

  let discountFilter = discount.filter(dateFilter(discount))
  const displayDiscountEnd = discountFilter.filter((item, index) => {
    return index < pageNow * 6 && index >= (pageNow - 1) * 6
  })

  // //過濾頁面的函式
  // function searchFor(searchText) {
  //   return function (x) {
  //     return (
  //       x.productName.includes(searchText) ||
  //       !searchText
  //     )
  //   }
  // }

  // // 過濾出快到期要呈現的資料
  // let data = discount.filter(searchFor(searchText))
  // const displayDiscountEnd = data.filter((item, index) => {
  //   return index < pageNow * 6 && index >= (pageNow - 1) * 6
  // })

  const display2 = (
    <>
      <Container style={{ padding: '30px' }}>
        <div className="row">
          {displayDiscountEnd.map((value, index) => {
            return (
              <>
                <Card
                  className="col-mb-auto"
                  style={{ width: '15rem' }}
                  key={index}
                >
                  <Card.Header>折扣編號：{value.discountID}</Card.Header>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>{value.discountName}</Card.Title>
                    <Card.Text>{value.discountEndDate}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleShow()
                      }}
                    >
                      刪除此折扣
                    </Button>
                  </Card.Body>
                </Card>
                <Modal
                  show={showModal}
                  onHide={handleClose}
                  {...props}
                  // size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>折扣編號：{value.discountID}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    確定要刪除「{value.discountName}」折扣？
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      取消刪除
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleClose()
                        discount.splice(value, 1)
                        setDeleteDiscountToLocalStorage(discount)
                      }}
                    >
                      確認刪除
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )
          })}
        </div>
      </Container>
      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() => props.history.push('/Member/MemberMyDiscount/page/1')}
        />
        <Pagination.Prev
          onClick={() =>
            props.history.push('/Member/MemberMyDiscount/page/' + pagePrev)
          }
        />

        <Pagination.Item active>{props.match.params.page}</Pagination.Item>

        <Pagination.Next
          onClick={() =>
            props.history.push('/Member/MemberMyDiscount/page/' + pageNext)
          }
        />
        <Pagination.Last
          onClick={() =>
            props.history.push(
              '/Member/MemberMyDiscount/page/' + discountPageTotal
            )
          }
        />
      </Pagination>
    </>
  )
  /*
   */

  return (
    <>
      <Router>
        <Container id="discounttabs">
          <Tabs
            justify
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="md" title="我的優惠">
              {loading ? spinner : display}
            </Tab>
            <Tab eventKey="ce" title="即將到期">
              {loading ? spinner : display2}
            </Tab>
            <Tab eventKey="au" title="已使用">
              {/* {loading ? spinner : display} */}
            </Tab>
            <Tab
              title={
                <>
                  <FaAngleLeft />
                  {'優惠查詢'}
                </>
              }
              style={{ textAlign: 'right' }}
              disabled
            ></Tab>
          </Tabs>
        </Container>
      </Router>
    </>
  )
}

export default withRouter(MemberMyDiscount)
