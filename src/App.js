import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { setLeagues } from './actions/leagues'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import NavBar from './containers/NavBar'
import Leagues from './containers/Leagues'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import StickyFooter from './components/StickyFooter'
import Friends from './components/Friends'
import Favorites from './components/Favorites'
import Profile from './components/Profile'

const leaguesURL = "http://localhost:3000/leagues"

function App({ setLeagues }) {
  console.log('renders App')

  useEffect( () => {
    console.log('renders App on mount')

    fetch( leaguesURL)
      .then( resp => resp.json() )
      .then( data => {
        setLeagues(data.all)
      })

  }, [setLeagues])

  return (
    <Router>
      <NavBar/>
      <Container>
        <Route exact path='/' component={Leagues} />
        <Route exact path='/login' component={LogIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/friends' component={Friends} />
        <Route exact path='/favorites' component={Favorites} />
        <Route exact path='/profile' component={Profile} />
      </Container>
      <StickyFooter/>
    </Router>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setLeagues: leagues => {
      dispatch(setLeagues(leagues))
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
