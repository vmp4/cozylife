import React from 'react'
import Member from './pages/Member'
import RBMenu from './components/RBMenu'
import NotFoundPage from './pages/NotFoundPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <RBMenu />
      <Switch>
        <Route path="/Member">
          <Member />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
