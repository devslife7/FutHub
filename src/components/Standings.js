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
  createData('Team 1', 159, 6.0, 24, 4.0),
  createData('Team 2', 237, 9.0, 37, 4.3),
  createData('Team 3', 262, 16.0, 24, 6.0),
  createData('Team 4', 305, 3.7, 67, 4.3),
  createData('Team 5', 356, 16.0, 49, 3.9),
  createData('Team 6', 356, 16.0, 49, 3.9),
  createData('Team 7', 356, 16.0, 49, 3.9),
  createData('Team 8', 356, 16.0, 49, 3.9),
  createData('Team 9', 356, 16.0, 49, 3.9),
  createData('Team 10', 356, 16.0, 49, 3.9),
  createData('Team 11', 356, 16.0, 49, 3.9),
  createData('Team 12', 356, 16.0, 49, 3.9),
  createData('Team 13', 356, 16.0, 49, 3.9),
  createData('Team 14', 356, 16.0, 49, 3.9),
];

export default function Standings() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ marginTop: '50px'}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Teams</TableCell>
            <TableCell align="right">Won</TableCell>
            <TableCell align="right">Tied</TableCell>
            <TableCell align="right">Lost</TableCell>
            <TableCell align="right">Average</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}