import React from 'react'
import Banner from '../components/Banner'
import { withRouter } from 'react-router-dom'

function NotFoundPage(props) {
  return (
    <>
      <Banner pagename="無此頁面" />
      <button
        onClick={() => {
          props.history.push('/Member')
        }}
      >
        回到會員中心
      </button>
      <button
        onClick={() => {
          props.history.goBack()
        }}
      >
        返回上一頁
      </button>
    </>
  )
}

export default withRouter(NotFoundPage)
