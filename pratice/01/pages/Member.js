import React, { useState } from 'react'

function Member(props) {
  const [name, setName] = useState('')
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button
        onClick={() => {
          props.sendMe(name)
        }}
      >
        output
      </button>
    </>
  )
}

export default Member
