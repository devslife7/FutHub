import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Arsenal', 0, 0, 0, 0, 0),
  createData('Manchester United', 0, 0, 0, 0, 0),
  createData('Liverpool', 0, 0, 0, 0, 0),
  createData('Manchester City', 0, 0, 0, 0, 0),
  createData('Tottenham Hotspur', 0, 0, 0, 0, 0),
  createData('Newcastle United', 0, 0, 0, 0, 0),
  createData('Southamptop', 0, 0, 0, 0, 0),
  createData('West Ham United', 0, 0, 0, 0, 0),
  createData('Leeds United', 0, 0, 0, 0, 0),
  createData('Fulham', 0, 0, 0, 0, 0),
  createData('Everton', 0, 0, 0, 0, 0),
  createData('Crystal Palace', 0, 0, 0, 0, 0),
  createData('Burnley', 0, 0, 0, 0, 0),
  createData('Leicester City', 0, 0, 0, 0, 0),
  createData('Wolverhamptop Wanderers', 0, 0, 0, 0, 0),
];

export default function Standings() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ marginTop: '7vh', padding: '30px'}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell align="right">Played</TableCell>
            <TableCell align="right">Win</TableCell>
            <TableCell align="right">Draw</TableCell>
            <TableCell align="right">Lost</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}