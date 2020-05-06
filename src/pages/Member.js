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
import NotFoundPage from './NotFoundPage'
import '../styles/custom.scss'
import { Container, Row, Col } from 'react-bootstrap'

function Member() {
  // const url = props.match.url
  // const path = props.match.path
  // console.log(props)
  // const [prop1, setProp1] = useState(props)

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
                    <Link to={`/Member/MemberMyFiles`}>個人資料</Link>
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
                    <Link to={`/Member/MemberInquire`}>訂單/問答/退貨查詢</Link>
                  </h5>
                </li>
              </ul>
            </Col>
            <Col md="10">
              <Switch>
                <Route path={`/Member/MemberMyFiles`}>
                  <MemberMyFiles />
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
}

export default withRouter(Member)
