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
} from 'react-router-dom'
import '../styles/custom.scss'
import { Container, Row, Col } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

function Member() {
  const [loading, setLoading] = useState(false)

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
      <Router>
        <Container>
          <Row>
            <Col md="2">
              <ul>
                <li>
                  <h4>
                    <NavLink to="/Member" id="paddingbottom">
                      會員中心
                    </NavLink>
                  </h4>
                </li>
                <br />
                <li id="list1">
                  <h5>
                    <Link to="/Member/MemberMyFiles">個人資料</Link>
                  </h5>
                </li>
                {/* <li id="list1">
                  <h5>
                    <Link to="/Member/MemberMyDiscount">我的優惠</Link>
                  </h5>
                </li>
                <li id="list1">
                  <h5>
                    <Link to="/Member/MemberMyCollection">我的收藏</Link>
                  </h5>
                </li>
                <li id="list1">
                  <h5>
                    <Link to="/Member/MemberInquire">訂單/問答/退貨查詢</Link>
                  </h5>
                </li> */}
              </ul>
            </Col>
            <Col md="10">
              <Switch>
                <Route path="/Member/MemberMyFiles">
                  <MemberMyFiles />
                </Route>
                <Route path="/Member/MemberMyCollection">
                  <MemberMyCollection />
                </Route>
                <Route path="/Member/MemberMyDiscount">
                  <MemberMyDiscount />
                </Route>
                <Route path="/Member/MemberInquire">
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
      </Router>
    </>
  )

  return <>{loading ? spinner : display}</>
}

export default Member
