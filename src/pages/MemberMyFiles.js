import React, { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router } from 'react-router-dom'
import MyFile from './MyFile'
import MyFileChangePass from './MyFileChangePass'
import { FaAngleLeft } from 'react-icons/fa'

function MemberMyFiles() {
  const [key, setKey] = useState('mdd')
  return (
    <>
      <Router>
        <Container id="filetabs">
          <Tabs
            justify
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="mdd" title="會員詳細資料">
              <MyFile />
            </Tab>
            {/* <Tab eventKey="ce" title="即將到期"></Tab>
        <Tab eventKey="au" title="已使用"></Tab> */}
            <Tab eventKey="cpw" title="修改密碼">
              <MyFileChangePass />
            </Tab>
            <Tab title={<></>} disabled></Tab>
            <Tab
              title={
                <>
                  <FaAngleLeft />
                  {'資料修改'}
                </>
              }
              disabled
            ></Tab>
          </Tabs>
        </Container>
      </Router>
    </>
  )
}

export default MemberMyFiles
