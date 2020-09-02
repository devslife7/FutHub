import React from 'react'
import { connect } from 'react-redux'
import LeagueCard from '../components/LeagueCard'
import { Grid } from '@material-ui/core'

function Favorites({ favorites }) {

  const renderFavoriteLeagues = () => {
    return favorites.map( (fav, idx) =>
    <Grid key={idx} item xs={3}>
      <LeagueCard league={fav}/>
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
    favorites: state.leagues.favorites
  }
}

export default connect(mapStateToProps)(Favorites)
