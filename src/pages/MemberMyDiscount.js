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
import Spinner from 'react-bootstrap/Spinner'
import { FaAngleLeft } from 'react-icons/fa'
// import DiscountPage from './DiscountPage'

function MemberMyDiscount(props) {
  const [key, setKey] = useState('md')
  const [loading, setLoading] = useState(false)
  const [discount, setDiscount] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showModalEnd, setShowModalEnd] = useState(false)
  const [showModalAll, setShowModalAll] = useState(false)
  const [showModalExpire, setShowModalExpire] = useState(false)

  function getDiscountFromLocalStorage() {
    setLoading(true)

    const newDiscount = JSON.parse(localStorage.getItem('discount')) || []
    setDiscount(newDiscount)

    // const discountPageTotal = Math.ceil(newDiscount.length / 6)
    // setDiscountPageTotal(discountPageTotal)

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

  // 過濾出目前可使用呈現的資料
  function dateFilter(discount) {
    return function (x) {
      return new Date(x.discountEndDate) - new Date() > 0 || !discount
    }
  }

  // 過濾出目前頁面要呈現的資料
  let discountFilter = discount.filter(dateFilter(discount))
  // const displayDiscount = discountFilter.filter((item, index) => {
  //   return index < pageNow * 6 && index >= (pageNow - 1) * 6
  // })

  // 我的優惠Modal用設定
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const display = (
    <>
      <Container style={{ padding: '30px' }}>
        <div className="row">
          {/* 可使用Card */}
          {discountFilter.map((value, index) => {
            return (
              <>
                <Card
                  key={index.id}
                  className="col-mb-auto"
                  style={{ width: '15rem' }}
                >
                  <Card.Header>>折扣編號：{value.discountID}</Card.Header>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>{value.discountName}</Card.Title>
                    <Card.Text>{value.discountEndDate}</Card.Text>
                    <div className="row">
                      <button
                        id="useDis"
                        style={{ margin: '5px 0 5px 10px' }}
                        className="btn btn-warning col-md-5"
                        onClick={() => {}}
                      >
                        去購買
                      </button>
                      <button
                        style={{ margin: '5px 0 5px 10px' }}
                        id="disDet"
                        className="btn btn-secondary col-md-5"
                        onClick={() => {
                          handleShow()
                        }}
                      >
                        刪除折扣
                      </button>
                    </div>
                  </Card.Body>
                </Card>

                {/* 可使用Card的Modal */}
                <Modal
                  key={index.id}
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
    </>
  )

  // 過濾出快到期要呈現的資料
  function dateEndFilter(discount) {
    return function (x) {
      return (
        (new Date(x.discountEndDate) - new Date() < 604800000 &&
          new Date(x.discountEndDate) - new Date() > 0) ||
        !discount
      )
    }
  }

  // 過濾出快到期頁面要呈現的資料
  let discountEndFilter = discount.filter(dateEndFilter(discount))
  // const displayDiscountEnd = discountEndFilter.filter((item, index) => {
  //   return index < pageNow * 6 && index >= (pageNow - 1) * 6
  // })

  // 快到期Modal用設定
  const handleCloseEnd = () => setShowModalEnd(false)
  const handleShowEnd = () => setShowModalEnd(true)

  // 快到期
  const display2 = (
    <>
      <Container style={{ padding: '30px' }}>
        <div className="row">
          {/* 快過期Card */}
          {discountEndFilter.map((value, index) => {
            return (
              <>
                <Card
                  key={index.id}
                  className="col-mb-auto"
                  style={{ width: '15rem' }}
                >
                  <Card.Header>折扣編號：{value.discountID}</Card.Header>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>{value.discountName}</Card.Title>
                    <Card.Text>{value.discountEndDate}</Card.Text>
                    <div className="row">
                      <button
                        id="useDis"
                        style={{ margin: '5px 0 5px 10px' }}
                        className="btn btn-warning col-md-5"
                        onClick={() => {}}
                      >
                        去購買
                      </button>
                      <button
                        style={{ margin: '5px 0 5px 10px' }}
                        id="disDet"
                        className="btn btn-secondary col-md-5"
                        onClick={() => {
                          handleShowEnd()
                        }}
                      >
                        刪除折扣
                      </button>
                    </div>
                  </Card.Body>
                </Card>

                {/* 快過期Card的Modal */}
                <Modal
                  key={index.id}
                  show={showModalEnd}
                  onHide={handleCloseEnd}
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
                    <Button variant="secondary" onClick={handleCloseEnd}>
                      取消刪除
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleCloseEnd()
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
    </>
  )

  // 過濾出已到期要呈現的資料
  function dateExpireFilter(discount) {
    return function (x) {
      return new Date(x.discountEndDate) - new Date() < 0 || !discount
    }
  }

  // 過濾出已到期頁面要呈現的資料
  let discountExpireFilter = discount.filter(dateExpireFilter(discount))
  // console.log(discountExpireFilter)
  // const displayDiscountExpire = discountExpireFilter.filter((item, index) => {
  //   return index < pageNow * 6 && index >= (pageNow - 1) * 6
  // })

  // 篩選所有過期並刪除
  function clear() {
    // let discountExpireFilter = discount.filter(dateExpireFilter(discount))
    // console.log(dateExpireFilter(discount))
    // console.log(discountExpireFilter)

    // console.log(new Date(discount.discountEndDate))
    // console.log(new Date())
    let temp = 0
    for (let i = 0; i < discount.length; i++) {
      if (new Date(discount[i].discountEndDate) - new Date() < 0 || !discount) {
        temp++
      }
    }
    // console.log(temp)

    for (let j = 0; j < temp; j++) {
      let arr = 0
      for (let i = 0; i < discount.length; i++) {
        if (
          new Date(discount[i].discountEndDate) - new Date() < 0 ||
          !discount
        ) {
          arr = i
        }
      }
      discount.splice(arr, 1)
    }
    console.log(discount)
    setDeleteDiscountToLocalStorage(discount)
  }

  // 一鍵刪除odal用設定
  const handleCloseAll = () => setShowModalAll(false)
  const handleShowAll = () => setShowModalAll(true)

  // 已過期Modal用設定
  const handleCloseExpire = () => setShowModalExpire(false)
  const handleShowExpire = () => setShowModalExpire(true)

  // 已過期
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
        <div>
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
            <Modal.Body>確定要刪除所有已到期折扣？</Modal.Body>
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
        </div>

        <div className="row">
          {/* 已過期Card */}
          {discountExpireFilter.map((value, index) => {
            return (
              <>
                <Card
                  key={index.id}
                  className="col-mb-auto"
                  style={{ width: '15rem' }}
                >
                  <Card.Header>折扣編號：{value.discountID}</Card.Header>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>{value.discountName}</Card.Title>
                    <Card.Text>{value.discountEndDate}</Card.Text>
                    <div className="row">
                      <button
                        style={{ margin: '5px 0 5px 10px' }}
                        id="disDet"
                        className="btn btn-danger col-md-5"
                        onClick={() => {
                          handleShowExpire()
                        }}
                      >
                        刪除折扣
                      </button>
                    </div>
                  </Card.Body>
                </Card>

                {/* 已過期Card的Modal */}
                <Modal
                  key={index.id}
                  show={showModalExpire}
                  onHide={handleCloseExpire}
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
                    <Button variant="secondary" onClick={handleCloseExpire}>
                      取消刪除
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleCloseExpire()
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
