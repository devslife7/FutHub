import React from 'react';
import { useState } from 'react'
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
  },
  buttonClicked: {
    margin: '10px',
    borderRadius: '0px',
    borderBottom: '2px solid',
  }
}))

function NavBar(props) {
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
              onClick={ () => setButtonClicked('Favorites')}
              className={ isMenuButtonClicked('Favorites') }
              color="inherit"
              >Friends
            </Button>
            <Button
              onClick={ () => setButtonClicked('Friends')}
              className={ isMenuButtonClicked('Friends') }
              color="inherit"
              >Friends
            </Button>
            <Button 
              onClick={ () => setButtonClicked('Leagues')}
              className={ isMenuButtonClicked('Leagues') } 
              color="inherit"
              >Leagues
            </Button>
            <Button 
              onClick={ () => setButtonClicked('Login')}
              className={ isMenuButtonClicked('Login') } 
              color="inherit"
              >Login
            </Button>
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

export default NavBar