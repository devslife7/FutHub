import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  pagination: {
    listStyle: 'none',
    display: 'flex'
  },
  pageItem: {
    backgroundColor: '#2196f3',
    margin: '10px',
    borderRadius: '5px'
  },
  pageLink: {
    textDecoration: 'none',
    padding: '15px 10px',
    color: 'white'
  }
}));

function Pagination({ leaguesPerPage, totalLeagues, paginate }) {
  const classes = useStyles()
  const pageNumbers = []

  for( let i=1; i <= Math.ceil(totalLeagues / leaguesPerPage); i++){
    if ( pageNumbers.length <= 15 ) {
      pageNumbers.push(i)
    }
  }
  return (
    <>
      <ul className={classes.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={classes.pageItem} >
              <a onClick={() => paginate(number)} href='!#' className={classes.pageLink}>
                {number}
              </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Pagination
