import React from 'react';
import { useState } from 'react' // add use effect for nav button to be consistant upon refresh
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'

// import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  navBarPadding: {
    padding: '0px'
  },
  buttonNotClicked: {
    margin: '10px',
    borderRadius: '0px',
    // backgroundColor: 'red'
  },
  buttonClicked: {
    margin: '10px',
    borderRadius: '0px',
    borderBottom: '2px solid',
  },
  links: {
    textDecoration: 'none',
    color: 'white',
  }
}))

function NavBar({ currentUser }) {
  const classes = useStyles()
  const [ buttonClicked, setButtonClicked ] = useState('Leagues')

  const isMenuButtonClicked = buttonName => {
    return buttonClicked === buttonName ? classes.buttonClicked : classes.buttonNotClicked
  }

  // const [value, setValue] = React.useState(2);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <div className={classes.root}>
      <AppBar position="static" color='primary'>
        <Container>
          <Toolbar className={classes.navBarPadding}>
            <Typography variant="h6" className={classes.title}>
              FutHub
            </Typography>
            <Button 
              onClick={ () => setButtonClicked('Leagues')}
              className={ isMenuButtonClicked('Leagues') } 
              color="inherit"
              >
                <Link to="/" className={classes.links}>
                  Leagues
                </Link>
            </Button>
            <Button
              onClick={ () => setButtonClicked('Favorites')}
              className={ isMenuButtonClicked('Favorites') }
              color="inherit"
              >
                <Link to="/favorites" className={classes.links}>
                  Favorites
                </Link>
            </Button>
            <Button
              onClick={ () => setButtonClicked('Friends')}
              className={ isMenuButtonClicked('Friends') }
              color="inherit"
              >
                <Link to="/friends" className={classes.links}>
                  Friends
                </Link>
            </Button>
            { localStorage.currentUser
            ?  <Button
                style={{ color: 'white' }}
                >
                  <Link to="/profile" className={classes.links}>
                  hello {currentUser.name}
                  </Link>
              </Button>
            : <Button 
                onClick={ () => setButtonClicked('Login')}
                className={ isMenuButtonClicked('Login') } 
                color="inherit"
                >
                  <Link to="/login" className={classes.links}>
                    Login
                  </Link>
              </Button>
            }

            {/* <Button 
              onClick={ () => setButtonClicked('Login')}
              className={ isMenuButtonClicked('Login') } 
              color="inherit"
              >Login
            </Button> */}
            {/* <Paper square>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
              >
                <Tab label="Active" />
                <Tab label="Disabled" disabled />
                <Tab label="Active" />
              </Tabs>
            </Paper> */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(NavBar)