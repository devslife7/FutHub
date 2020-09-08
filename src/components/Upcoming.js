import React from 'react'
import MatchCard from './MatchCard'
// import DatePickerMatches from './DatePickerMatches'
import DatePicker from './DatePicker'
import MatchInfo from './MatchInfo'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '3em',
    margin: '50px 0px'
  },
  paper: {
    minHeight: '75vh',
    // maxWidth: '80vh',
    // margin: 'auto',
    // borderRadius: '0px'
  },
  divider: {
    width: '50vh',
    margin: 'auto',
    marginTop: '15px',
  }
}))

function Upcoming() {
  const classes = useStyles()

  const renderMatches = () => {
    let matches = [
      {
        "fixture_id": 296721,
        "league_id": 1262,
        "league": {
            "name": "Serie A",
            "country": "Ecuador",
            "logo": "https://media.api-sports.io/football/leagues/242.png",
            "flag": "https://media.api-sports.io/flags/ec.svg"
        },
        "event_date": "2020-09-06T00:00:00+00:00",
        "event_timestamp": 1599350400,
        "firstHalfStart": 1599350400,
        "secondHalfStart": 1599354000,
        "round": "1° Turno - 11",
        "status": "Match Finished",
        "statusShort": "FT",
        "elapsed": 90,
        "venue": "Estadio Bellavista de Ambato",
        "referee": "M. Romero",
        "homeTeam": {
            "team_id": 1155,
            "team_name": "Macara",
            "logo": "https://media.api-sports.io/football/teams/1155.png"
        },
        "awayTeam": {
            "team_id": 1150,
            "team_name": "El Nacional",
            "logo": "https://media.api-sports.io/football/teams/1150.png"
        },
        "goalsHomeTeam": 1,
        "goalsAwayTeam": 0,
        "score": {
            "halftime": "1-0",
            "fulltime": "1-0",
            "extratime": null,
            "penalty": null
        }
      },
      {
        "fixture_id": 313969,
        "league_id": 1326,
        "league": {
            "name": "Primera A",
            "country": "Colombia",
            "logo": "https://media.api-sports.io/football/leagues/239.png",
            "flag": "https://media.api-sports.io/flags/co.svg"
        },
        "event_date": "2020-09-06T00:00:00+00:00",
        "event_timestamp": 1599350400,
        "firstHalfStart": null,
        "secondHalfStart": null,
        "round": "Clausura - 10",
        "status": "Match Postponed",
        "statusShort": "PST",
        "elapsed": 0,
        "venue": "Estadio Departamental Libertad",
        "referee": null,
        "homeTeam": {
            "team_id": 1126,
            "team_name": "Deportivo Pasto",
            "logo": "https://media.api-sports.io/football/teams/1126.png"
        },
        "awayTeam": {
            "team_id": 1144,
            "team_name": "Rionegro Aguilas",
            "logo": "https://media.api-sports.io/football/teams/1144.png"
        },
        "goalsHomeTeam": null,
        "goalsAwayTeam": null,
        "score": {
            "halftime": null,
            "fulltime": null,
            "extratime": null,
            "penalty": null
        }
      },
      {
        "fixture_id": 321692,
        "league_id": 1350,
        "league": {
            "name": "Primera Division",
            "country": "Venezuela",
            "logo": "https://media.api-sports.io/football/leagues/299.png",
            "flag": "https://media.api-sports.io/flags/ve.svg"
        },
        "event_date": "2020-09-06T20:00:00+00:00",
        "event_timestamp": 1599422400,
        "firstHalfStart": null,
        "secondHalfStart": null,
        "round": "Regular Season - 27",
        "status": "Match Cancelled",
        "statusShort": "CANC",
        "elapsed": 0,
        "venue": "CTE Cachamay",
        "referee": null,
        "homeTeam": {
            "team_id": 2824,
            "team_name": "Mineros de Guyana",
            "logo": "https://media.api-sports.io/football/teams/2824.png"
        },
        "awayTeam": {
            "team_id": 2818,
            "team_name": "Estudiantes de Merida FC",
            "logo": "https://media.api-sports.io/football/teams/2818.png"
        },
        "goalsHomeTeam": null,
        "goalsAwayTeam": null,
        "score": {
            "halftime": null,
            "fulltime": null,
            "extratime": null,
            "penalty": null
        }
    },
    {
        "fixture_id": 321693,
        "league_id": 1350,
        "league": {
            "name": "Primera Division",
            "country": "Venezuela",
            "logo": "https://media.api-sports.io/football/leagues/299.png",
            "flag": "https://media.api-sports.io/flags/ve.svg"
        },
        "event_date": "2020-09-06T20:00:00+00:00",
        "event_timestamp": 1599422400,
        "firstHalfStart": null,
        "secondHalfStart": null,
        "round": "Regular Season - 27",
        "status": "Match Cancelled",
        "statusShort": "CANC",
        "elapsed": 0,
        "venue": "Estadio Olímpico Florentino Oropeza",
        "referee": null,
        "homeTeam": {
            "team_id": 2843,
            "team_name": "Gran Valencia",
            "logo": "https://media.api-sports.io/football/teams/2843.png"
        },
        "awayTeam": {
            "team_id": 2808,
            "team_name": "Caracas FC",
            "logo": "https://media.api-sports.io/football/teams/2808.png"
        },
        "goalsHomeTeam": null,
        "goalsAwayTeam": null,
        "score": {
            "halftime": null,
            "fulltime": null,
            "extratime": null,
            "penalty": null
        }
    },
    {
        "fixture_id": 321694,
        "league_id": 1350,
        "league": {
            "name": "Primera Division",
            "country": "Venezuela",
            "logo": "https://media.api-sports.io/football/leagues/299.png",
            "flag": "https://media.api-sports.io/flags/ve.svg"
        },
        "event_date": "2020-09-06T20:00:00+00:00",
        "event_timestamp": 1599422400,
        "firstHalfStart": null,
        "secondHalfStart": null,
        "round": "Regular Season - 27",
        "status": "Match Cancelled",
        "statusShort": "CANC",
        "elapsed": 0,
        "venue": "Estadio Olímpico de la UCV",
        "referee": null,
        "homeTeam": {
            "team_id": 2809,
            "team_name": "Atletico Venezuela",
            "logo": "https://media.api-sports.io/football/teams/2809.png"
        },
        "awayTeam": {
            "team_id": 2805,
            "team_name": "Zulia FC",
            "logo": "https://media.api-sports.io/football/teams/2805.png"
        },
        "goalsHomeTeam": null,
        "goalsAwayTeam": null,
        "score": {
            "halftime": null,
            "fulltime": null,
            "extratime": null,
            "penalty": null
        }
    },
    {
        "fixture_id": 321695,
        "league_id": 1350,
        "league": {
            "name": "Primera Division",
            "country": "Venezuela",
            "logo": "https://media.api-sports.io/football/leagues/299.png",
            "flag": "https://media.api-sports.io/flags/ve.svg"
        },
        "event_date": "2020-09-06T20:00:00+00:00",
        "event_timestamp": 1599422400,
        "firstHalfStart": null,
        "secondHalfStart": null,
        "round": "Regular Season - 27",
        "status": "Match Cancelled",
        "statusShort": "CANC",
        "elapsed": 0,
        "venue": "Estadio Olímpico Florentino Oropeza",
        "referee": null,
        "homeTeam": {
            "team_id": 2829,
            "team_name": "Yaracuyanos FC",
            "logo": "https://media.api-sports.io/football/teams/2829.png"
        },
        "awayTeam": {
            "team_id": 2815,
            "team_name": "Trujillanos FC",
            "logo": "https://media.api-sports.io/football/teams/2815.png"
        },
        "goalsHomeTeam": null,
        "goalsAwayTeam": null,
        "score": {
            "halftime": null,
            "fulltime": null,
            "extratime": null,
            "penalty": null
        }
    }
    ]

    return matches.map( (match, idx) => 
        <Grid key={idx} item>
          <MatchCard match={match}/>
          <Divider className={classes.divider}/>
        </Grid>
    )
  }

  return (
    <>
      <Typography variant="h2" align="center" color="textPrimary" className={classes.title}>
        Upcoming Matches
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Grid container spacing={2} justify='center' direction='column' alignItems='center'>
              <Grid item style={{margin: '15px 0px'}} >
                <DatePicker/>
              </Grid>
              {renderMatches()}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper style={{ height: '64vh'}}>
            <Grid container spacing={2} justify='center' alignItems='center'>
              <MatchInfo/>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Upcoming
