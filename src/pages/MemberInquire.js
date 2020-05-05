import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'

function MemberInquire() {
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
      <div className="d-flex justify-content-center" id="loadinquire">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </>
  )

  const display = (
    <>
      <h1 id="inquiretop">詢問</h1>{' '}
    </>
  )

  return <>{loading ? spinner : display}</>
}

export default MemberInquire
