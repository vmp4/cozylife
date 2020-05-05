import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import {
  Container,
  Button,
  Pagination,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
// import CollectionPage from './CollectionPage'
// import ProPagination from './ProPagination'

const MemberMyCollection = (props) => {
  // console.log(props)
  const [key, setKey] = useState('mc')
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [showModal, setShowModal] = useState(false)
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

  function setDeleteProductToLocalStorage(value) {
    setLoading(true)
    localStorage.setItem('product', JSON.stringify(value))
    setProduct(value)
    setTimeout(() => {
      setLoading(false)
      alert('已刪除')
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

  // Modal用設定
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  // Pagination設定
  const pageNow = +props.match.params.page
  const pagePrev = pageNow - 1 > 0 ? pageNow - 1 : 1
  const pageNext =
    pageNow + 1 < productPageTotal ? pageNow + 1 : productPageTotal

  //過濾頁面的函式
  function searchFor(searchText) {
    return function (x) {
      return (
        x.productName.toLowerCase().includes(searchText.toLowerCase()) ||
        !searchText
      )
    }
  }

  // 過濾出要目前頁面要呈現的資料
  let dataFilter = product.filter(searchFor(searchText))
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
          {displayProduct.map((value, index) => {
            return (
              <>
                <Card
                  className="col-mb-auto"
                  style={{ width: '15rem' }}
                  key={index}
                >
                  <Card.Header>產品編號：{value.productID}</Card.Header>
                  <Card.Img variant="top" src={value.productImg} />
                  <Card.Body>
                    <Card.Title>{value.productName}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleShow()
                      }}
                    >
                      刪除此收藏
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
                    <Modal.Title>產品編號：{value.productID}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    確定要刪除「{value.productName}」收藏？
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      取消刪除
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleClose()
                        product.splice(value, 1)
                        setDeleteProductToLocalStorage(product)
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
    </>
  )

  if (product === []) return <></>

  return (
    <>
      <Router>
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
      </Router>
    </>
  )
}

export default withRouter(MemberMyCollection)
