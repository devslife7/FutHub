import React from 'react'
import { connect } from 'react-redux'
import LeagueCard from '../components/LeagueCard'
import { Grid } from '@material-ui/core'

function Favorites({ favLeagues }) {
  console.log('renders Favorites')

  const renderFavoriteLeagues = () => {
    return favLeagues.map( (fav, idx) =>
    <Grid key={idx} item xs={3}>
      <LeagueCard currentLeague={fav}/>
    </Grid>
    )
  }

  return (
    <div>
      <h2>Favorites leagues:</h2>
      <Grid item xs={12} container spacing={4}>
        {renderFavoriteLeagues()}
      </Grid>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    favLeagues: state.user.currentUser.favLeagues
  }
}

export default connect(mapStateToProps)(Favorites)
