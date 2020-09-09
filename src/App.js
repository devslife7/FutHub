import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { setCurrentUser } from './actions/user'
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
import Standings from './components/Standings'
import Upcoming from './components/Upcoming'

const usersURL = "http://localhost:3000/users/"

function App({ setCurrentUser, setLeagues }) {
  console.log('renders App')

  useEffect( () => {
    console.log('renders App on mount')
    console.log('fetches leagues')


    if (!!localStorage.userId){
      fetch( usersURL + localStorage.userId )
      .then( resp => resp.json() )
      .then( user => {
          // console.log('this is the return of the server: ', user)
          setCurrentUser(user)
        })
    }

  }, [setCurrentUser])

  return (
    <Router>
      <NavBar/>
      <Container>
        <Route exact path='/' component={Leagues} />
        <Route exact path='/leagues' component={Leagues} />
        <Route exact path='/login' component={LogIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/friends' component={Friends} />
        <Route exact path='/favorites' component={Favorites} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/standings' component={Standings} />
        <Route exact path='/upcoming' component={Upcoming} />
      </Container>
      <StickyFooter/>
    </Router>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => {
      dispatch(setCurrentUser(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
