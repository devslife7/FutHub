import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePicker({ setDateFromDatePicker, datePickerDate }) {
  const classes = useStyles();
  // const [date, setDate ] = useState("2020-09-10")
  // console.log('this is date:', date)

  return (
    <form className={classes.container} noValidate onChange={(e) => setDateFromDatePicker(e.target.value)}>
      {console.log('renders datepicker')}
      <TextField
        id="date"
        label="Select date"
        type="date"
        value={datePickerDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
