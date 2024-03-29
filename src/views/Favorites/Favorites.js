import React from 'react'
import { useSelector } from 'react-redux'
import LeagueCard from '../../components/LeagueCard'
import { Grid } from '@material-ui/core'

export default function Favorites() {
  console.log('renders Favorites')
  const favLeagues = useSelector(state => state.user.currentUser.favLeagues)

  const renderFavoriteLeagues = () => {
    return favLeagues.map((fav, idx) => (
      <Grid key={idx} item xs={3}>
        <LeagueCard currentLeague={fav} />
      </Grid>
    ))
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <Grid item xs={12} container spacing={4}>
        {renderFavoriteLeagues()}
      </Grid>
    </div>
  )
}
