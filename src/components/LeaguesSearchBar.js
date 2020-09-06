import React from 'react';
import { connect } from 'react-redux';
import { setSearchTermLeagues, fetchPopularLeagues, fetchInternationalLeagues, fetchAllLeagues } from '../actions/leagues'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import LanguageIcon from '@material-ui/icons/Language';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DoneAllIcon from '@material-ui/icons/DoneAll';

// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import FormControl from '@material-ui/core/FormControl';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  divider: {
    margin: '0px 0px 20px 0px'
  },
  searchInput: {
    margin: '0px 0px 20px 0px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
}));

function LeagueSearchBar({ setSearchTermLeagues, searchTerm, displayLeagues, fetchPopularLeagues, fetchInternationalLeagues, fetchAllLeagues }) {
  const classes = useStyles()

  return (
    <>
      <List>
        <TextField
          value={ searchTerm }
          onChange={ (event) => setSearchTermLeagues( event.target.value )}
          className={classes.searchInput}
          label="Search Leagues..."
          />
        <Divider />
        <ListItem button key='Popular' onClick={ fetchPopularLeagues }>
          <ListItemIcon> <SportsSoccerIcon /> </ListItemIcon>
          <ListItemText primary='Popular'/>
        </ListItem>
        <ListItem button key='International' onClick={ fetchInternationalLeagues } >
          <ListItemIcon> <LanguageIcon /> </ListItemIcon>
          <ListItemText primary='International' />
        </ListItem>
        <ListItem button key='All'  onClick={ fetchAllLeagues } >
          <ListItemIcon> <BlurCircularIcon /> </ListItemIcon>
          <ListItemText primary='All' />
        </ListItem>
        <Divider className={classes.divider} />
        {/* <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Country </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          // value={age}
          // onChange={handleChange}
          label="Country"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
        {/* <Divider className={classes.divider} /> */}
        <ListItem button key='Active'>
          <ListItemIcon> <DoneAllIcon /> </ListItemIcon>
          <ListItemText primary='Active' />
        </ListItem>
        <ListItem button key='Alphabetical'>
          <ListItemIcon> <SortByAlphaIcon /> </ListItemIcon>
          <ListItemText primary='Alphabetical' />
        </ListItem>
        <ListItem button key='Date'>
          <ListItemIcon> <EventNoteIcon /> </ListItemIcon>
          <ListItemText primary='Date' />
        </ListItem>
        <Typography noWrap style={{marginTop: '10px'}}>
          Results: { displayLeagues.length }
        </Typography>
      </List>
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setSearchTermLeagues: (searchTerm) => dispatch(setSearchTermLeagues(searchTerm)),
    fetchPopularLeagues: () => dispatch(fetchPopularLeagues()),
    fetchInternationalLeagues: () => dispatch(fetchInternationalLeagues()),
    fetchAllLeagues: () => dispatch(fetchAllLeagues())
  }
}

const mapStateToProps = state => {
  return {
    displayLeagues: state.leagues.display,
    searchTerm: state.searchTerm
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeagueSearchBar)