import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Container,
  Pagination,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
// import CollectionPage from './CollectionPage'
// import ProPagination from './ProPagination'

const MemberMyCollection = (props) => {
  // console.log(props)
  const [key, setKey] = useState('mc')
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [productID, setProductID] = useState('')
  const [picturepath, setPicturepath] = useState('')
  const [productName, setProductName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [productPageTotal, setProductPageTotal] = useState(1)

  function getDataFromLocalStorage() {
    setLoading(true)

    const newProduct = JSON.parse(localStorage.getItem('product')) || []
    setProduct(newProduct)
    // console.log(newProduct)

    const productPageTotal = Math.ceil(newProduct.length / 6)
    setProductPageTotal(productPageTotal)
    // console.log(productPageTotal)

    if (!props.match.params.page)
      props.history.push('/Member/MemberMyCollection/page/1')
    // console.log(props)
  }

  // 把刪除的商品陣列重新set進localStorage 讓上面讀取localStorage資料為更新後
  function setDeleteProductToLocalStorage(value) {
    setLoading(true)
    localStorage.setItem('product', JSON.stringify(value))
    setProduct(value)
    setTimeout(() => {
      setLoading(false)
      handleShowConfirm()
    })
  }

  useEffect(() => {
    getDataFromLocalStorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const spinner = (
    <>
      <div className="d-flex justify-content-center" id="loadcollection">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </>
  )

  // 刪除完成Modal用設定
  const handleDeleteClose = () => setShowModal(false)
  const handleDeleteShow = (id) => {
    const item = product.find((item) => item.productID === id)
    setProductID(item.productID)
    setPicturepath(item.Picturepath)
    setProductName(item.productName)
    setShowModal(true)
  }
  function productDelete(id) {
    const newData = product.filter((product) => product.productID !== id)
    // console.log(newData)
    setDeleteProductToLocalStorage(newData)
  }

  // 確認刪除Modal用設定
  const handleCloseConfirm = () => setShowModalConfirm(false)
  const handleShowConfirm = () => setShowModalConfirm(true)

  // Pagination設定
  const pageNow = +props.match.params.page
  const pagePrev = pageNow - 1 > 0 ? pageNow - 1 : 1
  const pageNext =
    pageNow + 1 < productPageTotal ? pageNow + 1 : productPageTotal

  //過濾商品函式
  function searchFor(searchText) {
    return function (x) {
      return (
        x.productName.toLowerCase().includes(searchText.toLowerCase()) ||
        !searchText
      )
    }
  }

  // 過濾出要目前頁面要呈現的商品資料
  let dataFilter = product.filter(searchFor(searchText))
  // console.log(dataFilter)
  const displayProduct = dataFilter.filter((item, index) => {
    return index < pageNow * 6 && index >= (pageNow - 1) * 6
  })

  const display = (
    <>
      {/* <CollectionPage
        product={product}
        setDeleteProductToLocalStorage={setDeleteProductToLocalStorage}
      /> */}
      <Container style={{ margin: '30px' }}>
        <div className="row">
          {displayProduct.map((item) => {
            return (
              <>
                <Card
                  className="col-mb-auto"
                  style={{ width: '15rem' }}
                  key={item.id}
                >
                  <Card.Header>產品編號：{item.productID}</Card.Header>
                  <Card.Img variant="top" src={item.Picturepath} />
                  <Card.Body>
                    <Card.Title>{item.productName}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <div className="row">
                      <button
                        id="goShop"
                        style={{ margin: '5px 9px 10px 9px' }}
                        className="btn btn-warning col-md-5"
                        onClick={() => {
                          props.history.push('/Member')
                        }}
                      >
                        去購買
                      </button>
                      <button
                        style={{ margin: '5px 9px 10px 9px' }}
                        id="colDet"
                        className="btn btn-secondary col-md-5"
                        // key={item.id}
                        onClick={() => {
                          handleDeleteShow(item.productID)
                        }}
                      >
                        刪除收藏
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </>
            )
          })}
          <Modal
            // key={item.id}
            show={showModal}
            onHide={handleDeleteClose}
            {...props}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>確定要刪除「{productName}」收藏？</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                src={picturepath}
                style={{
                  maxWidth: '100%',
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteClose}>
                取消刪除
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleDeleteClose()
                  productDelete(productID)
                }}
              >
                確認刪除
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() =>
            props.history.push('/Member/MemberMyCollection/page/1')
          }
        />
        <Pagination.Prev
          onClick={() =>
            props.history.push('/Member/MemberMyCollection/page/' + pagePrev)
          }
        />
        {/* <Pagination.Ellipsis /> */}

        <Pagination.Item active>{props.match.params.page}</Pagination.Item>

        {/* <Pagination.Ellipsis /> */}
        <Pagination.Next
          onClick={() =>
            props.history.push('/Member/MemberMyCollection/page/' + pageNext)
          }
        />
        <Pagination.Last
          onClick={() =>
            props.history.push(
              '/Member/MemberMyCollection/page/' + productPageTotal
            )
          }
        />
      </Pagination>
      {/* <ProPagination productPageTotal={productPageTotal} /> */}
      <Modal
        show={showModalConfirm}
        onHide={handleCloseConfirm}
        {...props}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ color: 'brown' }}>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center', color: 'blue' }}>
          刪除完成
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleCloseConfirm()
            }}
          >
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

  if (product === []) return <></>

  return (
    <>
      <Container id="collectiontabs">
        <Tabs
          justify
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="mc" title="我的收藏">
            {loading ? spinner : display}
          </Tab>
          {/* <Tab eventKey="ce" title="即將到期"></Tab>
          <Tab eventKey="au" title="已使用"></Tab> */}
          {/* <Tab title={<></>} disabled></Tab> */}
          <Tab
            title={
              <>
                <InputGroup>
                  <FormControl
                    name="searchText"
                    placeholder="輸入產品名稱進行搜尋"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </InputGroup>
              </>
            }
          ></Tab>
        </Tabs>
      </Container>
    </>
  )
}

export default withRouter(MemberMyCollection)
