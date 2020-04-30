import React from 'react'

class Member extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
    }
  }
  render() {
    return (
      <>
        <div className="container">
          <h1>test :</h1>
          <input
            type="text"
            value={this.state.name}
            onChange={(event) => this.setState({ name: event.target.value })}
          />
          <button
            onClick={() => {
              this.props.sendMe(this.state.name)
            }}
          >
            input
          </button>
        </div>
      </>
    )
  }
}

export default Member
