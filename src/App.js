import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import NavBar from './containers/NavBar'
import Leagues from './containers/Leagues'
import { BottomNavigation } from '@material-ui/core';

import About from './components/About'

function App() {
  return (
    <Router>
      <NavBar/>

      <Container>
        <Route exact path='/about' component={About} />
        <Leagues />
      </Container>

      <BottomNavigation/>
    </Router>
  )
}

export default App
