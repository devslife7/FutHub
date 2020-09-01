import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import NavBar from './containers/NavBar'
import Leagues from './containers/Leagues'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import StickyFooter from './components/StickyFooter'
import Friends from './components/Friends'
// import { BottomNavigation } from '@material-ui/core';

function App() {
  return (
    <Router>
      <NavBar/>

      <Container>
        <Route exact path='/' component={Leagues} />
        <Route exact path='/login' component={LogIn} />
        <Route exact path='/signup' component={SignUp} />
        {/* <Route exact path='/friends' component={Friends} /> */}

      </Container>
      <StickyFooter/>

      {/* <BottomNavigation/> */}
    </Router>
  )
}

export default App
