import React, { useState, useEffect } from 'react'
import MemberMyFiles from './MemberMyFiles'
import MemberMyCollection from './MemberMyCollection'
import MemberMyDiscount from './MemberMyDiscount'
import MemberInquire from './MemberInquire'
import NotFoundPage from './NotFoundPage'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
  withRouter,
} from 'react-router-dom'
import '../styles/custom.scss'
import { Container, Row, Col } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

function Member(props) {
  const [loading, setLoading] = useState(false)

  const url = props.match.url
  const path = props.match.path

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const spinner = (
    <>
      <div className="d-flex justify-content-center" id="loadmember">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </>
  )

  const display = (
    <>
      <Container>
        <Row>
          <Col md="2">
            <ul>
              <li>
                <h4>
                  <NavLink to={url} id="paddingbottom">
                    會員中心
                  </NavLink>
                </h4>
              </li>
              <br />
              <li id="list1">
                <h5>
                  <Link to={`${url}/MemberMyFiles`}>個人資料</Link>
                </h5>
              </li>
              <li id="list1">
                <h5>
                  <Link to={`${url}/MemberMyDiscount`}>我的優惠</Link>
                </h5>
              </li>
              <li id="list1">
                <h5>
                  <Link to={`${url}/MemberMyCollection`}>我的收藏</Link>
                </h5>
              </li>
              <li id="list1">
                <h5>
                  <Link to={`${url}/MemberInquire`}>訂單/問答/退貨查詢</Link>
                </h5>
              </li>
            </ul>
          </Col>
          <Col md="10">
            <Switch>
              <Route path={`${path}/MemberMyFiles`}>
                <MemberMyFiles />
              </Route>
              <Route path={`${path}/MemberMyDiscount`}>
                <MemberMyDiscount />
              </Route>
              <Route path={`${path}/MemberMyCollection`}>
                <MemberMyCollection />
              </Route>
              <Route path={`${path}/MemberInquire`}>
                <MemberInquire />
              </Route>

              <Route path="/Member/*">
                <NotFoundPage />
              </Route>
              {/* <Route path="/Member/MemberMyFiles/*">
                  <NotFoundPage />
                </Route>
                <Route path="/Member/MemberMyCollection/*">
                  <NotFoundPage />
                </Route>
                <Route path="/Member/MemberMyDiscount/*">
                  <NotFoundPage />
                </Route>
                <Route path="/Member/MemberInquire/*">
                  <NotFoundPage />
                </Route> */}
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  )

  return <>{loading ? spinner : display}</>
}

export default withRouter(Member)
