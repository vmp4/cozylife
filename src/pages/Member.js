import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
  withRouter,
} from 'react-router-dom'
import MemberMyFiles from './MemberMyFiles'
import MemberMyCollection from './MemberMyCollection'
import MemberMyDiscount from './MemberMyDiscount'
import MemberInquire from './MemberInquire'
// import NotFoundPage from './NotFoundPage'
import '../styles/custom.scss'
import { Container, Row, Col } from 'react-bootstrap'

function Member(props) {
  // const userid = props.match.params.userid
  const userid = 1

  // const url = props.match.url
  // const path = props.match.path
  // console.log(url)
  // console.log(userid)

  return (
    <>
      <Router>
        <Container>
          <Row>
            <Col md="2">
              <ul id="paddingbottom">
                <li>
                  <h4>
                    <NavLink to="/member">會員中心</NavLink>
                  </h4>
                </li>
                <br />
                <li id="list1">
                  <h5>
                    <Link to={`/Member/MemberMyFiles/` + userid}>個人資料</Link>
                  </h5>
                </li>
                <li id="list1">
                  <h5>
                    <Link to={`/Member/MemberMyDiscount/page/1`}>我的優惠</Link>
                  </h5>
                </li>
                <li id="list1">
                  <h5>
                    <Link to={`/Member/MemberMyCollection/page/1`}>
                      我的收藏
                    </Link>
                  </h5>
                </li>
                <li id="list1">
                  <h5>
                    <Link to={`/Member/MemberInquire`}>訂單查詢</Link>
                  </h5>
                </li>
              </ul>
            </Col>
            <Col md="10">
              <Switch>
                <Route path={`/Member/MemberMyFiles/` + userid}>
                  <MemberMyFiles userid={userid} />
                </Route>
                <Route path={`/Member/MemberMyDiscount/page/:page`}>
                  <MemberMyDiscount />
                </Route>
                <Route path={`/Member/MemberMyCollection/page/:page`}>
                  <MemberMyCollection />
                </Route>
                <Route path={`/Member/MemberInquire`}>
                  <MemberInquire />
                </Route>

                {/* <Route path="/Member/*">
                  <NotFoundPage />
                </Route> */}
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
}

export default withRouter(Member)
