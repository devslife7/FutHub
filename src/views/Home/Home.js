import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '10px',
  },
}))

export default function Home() {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.paper}>Welcome to FutFriends</Paper>
    </>
  )
}
