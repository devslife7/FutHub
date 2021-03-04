import React from 'react'
import { useSelector } from 'react-redux'
import LeagueCard from '../components/LeagueCard'
import { Grid } from '@material-ui/core'

function Favorites() {
  console.log('renders Favorites')
  const favLeagues = useSelector(state => state.user.currentUser.favLeagues)

  const renderFavoriteLeagues = () => {
    return favLeagues.map( (fav, idx) =>
    <Grid key={idx} item xs={3}>
      <LeagueCard currentLeague={fav}/>
    </Grid>
    )
  }

  return (
    <div style={{ marginTop: '30px'}}>
      {/* <h2>Favorites leagues:</h2> */}
      <Grid item xs={12} container spacing={4}>
        {renderFavoriteLeagues()}
      </Grid>
    </div>
  )
}

export default Favorites
