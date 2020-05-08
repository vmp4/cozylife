import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Container,
  Button,
  // Pagination,
  // FormControl,
  // InputGroup,
} from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import { FaAngleLeft } from 'react-icons/fa'
// import DiscountPage from './DiscountPage'

function MemberMyDiscount(props) {
  const [key, setKey] = useState('md')
  const [loading, setLoading] = useState(false)
  const [discount, setDiscount] = useState([])
  const [couponID, setCouponID] = useState('')
  const [couponName, setCouponName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [couponPicture, setCouponPicture] = useState('')
  const [showModalEnd, setShowModalEnd] = useState(false)
  const [showModalAll, setShowModalAll] = useState(false)
  const [showModalExpire, setShowModalExpire] = useState(false)

  function getDiscountFromLocalStorage() {
    setLoading(true)

    const newDiscount = JSON.parse(localStorage.getItem('coupon')) || []
    setDiscount(newDiscount)

    // const discountPageTotal = Math.ceil(newDiscount.length / 6)
    // setDiscountPageTotal(discountPageTotal)

    if (!props.match.params.page)
      props.history.push('/Member/MemberMyDiscount/page/1')
  }

  // 把刪除的折扣陣列重新set進localStorage 讓上面讀取localStorage資料為更新後
  function setDeleteDiscountToLocalStorage(value) {
    setLoading(true)

    localStorage.setItem('coupon', JSON.stringify(value))
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

  // 把所有日期以YYYY-MM-DD顯示
  for (let i = 0; i < discount.length; i++) {
    discount[i].coupon_end_time = discount[i].coupon_end_time.split('T')[0]
  }

  // 篩選出符合快過期7天內的折扣、日期顏色為紅或藍的涵式，給還可以使用的優惠style顯示用
  function checkDate(item) {
    if (new Date(item.coupon_end_time) - new Date() > 604800000) {
      return { color: 'green' }
    } else if (
      new Date(item.coupon_end_time) - new Date() < 604800000 &&
      new Date(item.coupon_end_time) - new Date() > 259200000
    ) {
      return { color: 'blue' }
    } else if (
      new Date(item.coupon_end_time) - new Date() < 259200000 &&
      new Date(item.coupon_end_time) - new Date() > 0
    ) {
      return { color: 'red' }
    } else {
      return { color: 'brown' }
    }
  }

  // 我的優惠Modal用設定
  const handleClose = () => setShowModal(false)
  const handleShow = (id) => {
    const item = discount.find((item) => item.coupon_id === id)
    setCouponPicture(item.coupon_picture)
    setCouponName(item.coupon_name)
    setCouponID(item.coupon_id)
    setShowModal(true)
  }
  const couponDelete = (id) => {
    const newData = discount.filter((item) => item.coupon_id !== id)
    // console.log(newData)
    setDeleteDiscountToLocalStorage(newData)
  }

  // 過濾出目前可使用呈現的資料
  function dateFilter(discount) {
    return function (x) {
      return new Date(x.coupon_end_time) - new Date() > 0 || !discount
    }
  }

  // 過濾出我的優惠目前頁面要呈現的資料
  let discountFilter = discount.filter(dateFilter(discount))

  // 我的優惠頁面
  const display = (
    <>
      <Container style={{ padding: '30px' }}>
        <div className="row">
          {/* 可使用Card */}
          {discountFilter.map((item) => {
            return (
              <>
                <Card
                  key={item.id}
                  className="col-mb-auto"
                  style={{ width: '15rem' }}
                >
                  <Card.Header>>折扣編號：{item.coupon_id}</Card.Header>
                  <Card.Img variant="top" src={item.coupon_picture} />
                  <Card.Body>
                    <Card.Title>{item.coupon_name}</Card.Title>
                    <Card.Text style={{ marginBottom: '-1px' }}>
                      使用期限：
                    </Card.Text>
                    <Card.Text style={checkDate(item)}>
                      {item.coupon_end_time}
                    </Card.Text>
                    <div className="row">
                      <button
                        id="useDis"
                        style={{ margin: '5px 9px 10px 9px' }}
                        className="btn btn-warning col-md-5"
                        onClick={() => {
                          props.history.push('/Member')
                        }}
                      >
                        去使用
                      </button>
                      <button
                        style={{ margin: '5px 9px 10px 9px' }}
                        id="disDet"
                        className="btn btn-secondary col-md-5"
                        onClick={() => {
                          handleShow(item.coupon_id)
                        }}
                      >
                        刪除折扣
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </>
            )
          })}

          {/* 可使用Card的Modal */}
          <Modal
            show={showModal}
            onHide={handleClose}
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>確定要刪除「{couponName}」折扣？</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                src={couponPicture}
                style={{
                  maxWidth: '100%',
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                取消刪除
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleClose()
                  couponDelete(couponID)
                }}
              >
                確認刪除
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </>
  )

  // ------------------------------------------------------下面為快要到期的分隔線------------------------------------------------------

  // 快到期Modal用設定
  const handleCloseEnd = () => setShowModalEnd(false)
  const handleShowEnd = (id) => {
    const item = discount.find((item) => item.coupon_id === id)
    setCouponPicture(item.coupon_picture)
    setCouponName(item.coupon_name)
    setCouponID(item.coupon_id)
    setShowModalEnd(true)
  }
  const couponEndDelete = (id) => {
    const newData = discount.filter((item) => item.coupon_id !== id)
    // console.log(newData)
    setDeleteDiscountToLocalStorage(newData)
  }

  // 過濾出快到期要呈現的資料
  function dateEndFilter(discount) {
    return function (x) {
      return (
        (new Date(x.coupon_end_time) - new Date() < 604800000 &&
          new Date(x.coupon_end_time) - new Date() > 0) ||
        !discount
      )
    }
  }

  // 過濾出快到期頁面要呈現的資料
  let discountEndFilter = discount.filter(dateEndFilter(discount))

  // 快到期頁面
  const display2 = (
    <>
      <Container style={{ padding: '30px' }}>
        <div className="row">
          {/* 快過期Card */}
          {discountEndFilter.map((item) => {
            return (
              <>
                <Card
                  key={item.id}
                  className="col-mb-auto"
                  style={{ width: '15rem' }}
                >
                  <Card.Header>折扣編號：{item.coupon_id}</Card.Header>
                  <Card.Img variant="top" src={item.coupon_picture} />
                  <Card.Body>
                    <Card.Title>{item.coupon_name}</Card.Title>
                    <Card.Text style={{ marginBottom: '-1px' }}>
                      使用期限：
                    </Card.Text>
                    <Card.Text style={checkDate(item)}>
                      {item.coupon_end_time}
                    </Card.Text>
                    <div className="row">
                      <button
                        id="useDis"
                        style={{ margin: '5px 9px 10px 9px' }}
                        className="btn btn-warning col-md-5"
                        onClick={() => {
                          props.history.push('/Member')
                        }}
                      >
                        去使用
                      </button>
                      <button
                        style={{ margin: '5px 9px 10px 9px' }}
                        id="disDet"
                        className="btn btn-secondary col-md-5"
                        onClick={() => {
                          handleShowEnd(item.coupon_id)
                        }}
                      >
                        刪除折扣
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </>
            )
          })}

          {/* 快過期Card的Modal */}
          <Modal
            show={showModalEnd}
            onHide={handleCloseEnd}
            {...props}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>確定要刪除「{couponName}」折扣？</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                src={couponPicture}
                style={{
                  maxWidth: '100%',
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEnd}>
                取消刪除
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleCloseEnd()
                  couponEndDelete(couponID)
                }}
              >
                確認刪除
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </>
  )

  // ------------------------------------------------------下面為已過期的分隔線------------------------------------------------------

  // 過濾出已過期要呈現的資料
  function dateExpireFilter(discount) {
    return function (x) {
      return new Date(x.coupon_end_time) - new Date() < 0 || !discount
    }
  }

  // 過濾出已到期頁面要呈現的資料
  let discountExpireFilter = discount.filter(dateExpireFilter(discount))

  // 篩選所有過期並刪除
  function clear() {
    let temp = 0
    for (let i = 0; i < discount.length; i++) {
      if (new Date(discount[i].coupon_end_time) - new Date() < 0 || !discount) {
        temp++
      }
    }
    // console.log(temp)

    for (let j = 0; j < temp; j++) {
      let arr = 0
      for (let i = 0; i < discount.length; i++) {
        if (
          new Date(discount[i].coupon_end_time) - new Date() < 0 ||
          !discount
        ) {
          arr = i
        }
      }
      discount.splice(arr, 1)
    }
    // console.log(discount)
    setDeleteDiscountToLocalStorage(discount)
  }

  // 一鍵刪除odal用設定
  const handleCloseAll = () => setShowModalAll(false)
  const handleShowAll = () => setShowModalAll(true)

  // 已過期Modal用設定
  const handleCloseExpire = () => setShowModalExpire(false)
  const handleShowExpire = (id) => {
    const item = discount.find((item) => item.coupon_id === id)
    setCouponPicture(item.coupon_picture)
    setCouponName(item.coupon_name)
    setCouponID(item.coupon_id)
    setShowModalExpire(true)
  }
  function productExpirtDelete(id) {
    const newData = discount.filter((item) => item.coupon_id !== id)
    // console.log(newData)
    setDeleteDiscountToLocalStorage(newData)
  }

  // 已過期頁面
  const display3 = (
    <>
      <Container style={{ padding: '30px' }}>
        {/* 一鍵刪除 */}
        <Button
          className="justify-content-center col-mb-auto"
          variant="danger"
          onClick={() => {
            handleShowAll()
          }}
        >
          一鍵刪除
        </Button>

        {/* 一鍵刪除的Modal */}
        <Modal
          show={showModalAll}
          onHide={handleCloseAll}
          {...props}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>全部刪除</Modal.Title>
          </Modal.Header>
          <Modal.Body>確定要刪除所有已過期折扣？</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAll}>
              取消刪除
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                clear()
                handleCloseAll()
              }}
            >
              確認刪除
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="row">
          {/* 已過期Card */}
          {discountExpireFilter.map((item) => {
            return (
              <>
                <Card
                  key={item.id}
                  className="col-mb-auto"
                  style={{ width: '15rem' }}
                >
                  <Card.Header>折扣編號：{item.coupon_id}</Card.Header>
                  <div style={{ position: 'relative' }}>
                    <Card.Img variant="top" src={item.coupon_picture} />
                    <div
                      style={{
                        position: 'absolute',
                        zIndex: '2',
                        left: '10px',
                        top: '30px',
                        fontSize: '70px',
                        color: 'brown',
                        textShadow: '3px 3px #ffffff',
                      }}
                    >
                      <b>已失效</b>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{item.coupon_name}</Card.Title>
                    <Card.Text style={{ marginBottom: '-1px' }}>
                      使用期限：
                    </Card.Text>
                    <Card.Text style={checkDate(item)}>
                      很抱歉，此折扣已過期。
                    </Card.Text>
                    <div className="row">
                      <button
                        style={{ margin: '5px 9px 10px 9px' }}
                        id="disDet"
                        className="btn btn-danger col-md-5"
                        onClick={() => {
                          handleShowExpire(item.coupon_id)
                        }}
                      >
                        刪除折扣
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </>
            )
          })}

          {/* 已過期Card的Modal */}
          <Modal
            show={showModalExpire}
            onHide={handleCloseExpire}
            {...props}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>很可惜，您沒有使用{couponName}！</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ position: 'relative' }}>
                <Image
                  src={couponPicture}
                  style={{
                    maxWidth: '100%',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    zIndex: '2',
                    left: '5px',
                    top: '4vmin',
                    fontSize: '21vmin',
                    color: 'brown',
                    textShadow: '0.2rem 0.2rem #fff',
                  }}
                >
                  <b>已失效</b>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseExpire}>
                取消刪除
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleCloseExpire()
                  productExpirtDelete(couponID)
                }}
              >
                確認刪除
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </>
  )

  return (
    <>
      <Container id="discounttabs">
        <Tabs
          justify
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          {/* <Tab title={<></>} disabled></Tab> */}
          <Tab eventKey="md" title="我的優惠">
            {loading ? spinner : display}
          </Tab>
          <Tab eventKey="ce" title="即將到期">
            {loading ? spinner : display2}
          </Tab>
          <Tab eventKey="au" title="已過期">
            {loading ? spinner : display3}
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
    </>
  )
}

export default withRouter(MemberMyDiscount)
