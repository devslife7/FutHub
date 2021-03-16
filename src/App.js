import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './actions/user'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'

import { NavBar, Footer } from './layouts'
import { Login, Signup, Profile, Favorites, Friends, Leagues, Games, Standings, Home } from './views'

const serverURL = process.env.REACT_APP_SERVER_URL
const usersURL = serverURL + 'users/'

export default function App() {
  console.log('renders App')
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('renders App on mount')

    if (!!localStorage.userId) {
      fetch(usersURL + localStorage.userId)
        .then(resp => resp.json())
        .then(user => {
          dispatch(setCurrentUser(user))
        })
    }
  }, [dispatch])

  return (
    <Router>
      <NavBar />
      <Container>
        <Route exact path='/' component={Home} />
        <Route exact path='/leagues' component={Leagues} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/friends' component={Friends} />
        <Route exact path='/favorites' component={Favorites} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/standings' component={Standings} />
        <Route exact path='/games' component={Games} />
      </Container>
      {/* <Footer /> */}
    </Router>
  )
}
