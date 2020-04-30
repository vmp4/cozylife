import React from 'react'
import MemberClass from './pages/MemberClass'
import Member from './pages/Member'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      textNow: '',
    }
  }

  getData = (value) => {
    this.setState({ textNow: value })
  }

  render() {
    return (
      <>
        <MemberClass sendMe={this.getData} />
        <Member sendMe={this.getData} />
      </>
    )
  }
}

export default App
