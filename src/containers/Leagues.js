import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LeagueCard from '../components/LeagueCard'
import LeagueSearchBar from '../components/LeaguesSearchBar'
// import Pagination from '../components/Pagination'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { fetchPopularLeagues } from '../actions/leagues'
// import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '7vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Leagues() {
  console.log("renders Leagues")
  const classes = useStyles()
  const dispatch = useDispatch()
  const displayLeagues = useSelector(state => state.leagues.display)
  const searchTerm = useSelector(state => state.leagues.searchTerm)
  const loading = useSelector(state => state.leagues.loading)

  const [ currentPage ] = useState(1)
  const [ leaguesPerPage ] = useState(9)


  useEffect(() => {
    dispatch(fetchPopularLeagues())
  }, [dispatch])

  const renderLeagues = () => {
      const indexOfLastPost = currentPage * leaguesPerPage
      const indexOfFirstPost = indexOfLastPost - leaguesPerPage

      let searchedLeagues = displayLeagues.filter( league => {
        return league.name.toLowerCase().includes(searchTerm.toLowerCase()) || league.country.toLowerCase().includes(searchTerm.toLowerCase())
      })

      return searchedLeagues.slice(0, 20).map( (league, idx) => 
        <Grid key={idx} item xs={3}>
          <LeagueCard currentLeague={league}/>
        </Grid>
      )
  }

  // const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <LeagueSearchBar />
          </Paper>
        </Grid>
        <Grid item xs={9} container spacing={3} style={{marginLeft: 10}}>
            { loading
            ? <div
                style={{marginTop: '20vh', marginLeft: '40vh', fontSize: '22px'}}
              > Loading... </div>
            : renderLeagues() 
            }
            {/* <Pagination count={5} page={1} onChange={paginate} shape="rounded"/> */}
            <Grid item xs={12} style={{ justifyContent: 'center'}}>
              {/* <Pagination
                leaguesPerPage={leaguesPerPage}
                totalLeagues={ props.leagues.display.length }
                paginate={paginate}
              /> */}
            </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Leagues
