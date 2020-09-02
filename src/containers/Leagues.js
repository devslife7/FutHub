import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import LeagueCard from '../components/LeagueCard'
import LeagueSearchBar from '../components/LeaguesSearchBar'
import Pagination from '../components/Pagination'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '50px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Leagues( props ) {
  console.log("renders Leagues")
  const classes = useStyles()
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ leaguesPerPage ] = useState(9)

  // let results

  const renderLeagues = () => {
    // if (Object.entries(props.leagues).length > 0) {
      const indexOfLastPost = currentPage * leaguesPerPage
      const indexOfFirstPost = indexOfLastPost - leaguesPerPage
      let leagues = props.leagues.display

      leagues = leagues.filter( league => league.name.toLowerCase().includes(props.leagues.searchTerm.toLowerCase()) || league.country.toLowerCase().includes(props.leagues.searchTerm.toLowerCase()) )

      // results = leagues.length

      let currentLeagues = leagues.slice(indexOfFirstPost, indexOfLastPost)

      return currentLeagues.map( (l, idx) => 
        <Grid key={idx} item xs={4}>
          <LeagueCard league={l}/>
        </Grid>
      )
    // }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <LeagueSearchBar />
            {/* <LeagueSearchBar results={results}/> */}
          </Paper>
        </Grid>
        <Grid item xs={9} container spacing={4} style={{marginLeft: 10}}>
            {renderLeagues()}
            {/* <Pagination count={5} page={1} onChange={paginate} shape="rounded"/> */}
            <Grid item xs={12} style={{ justifyContent: 'center'}}>
              <Pagination
                leaguesPerPage={leaguesPerPage}
                totalLeagues={ props.leagues.display.length }
                paginate={paginate}
              />
            </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    leagues: state.leagues
  }
}

export default connect(mapStateToProps)(Leagues)
