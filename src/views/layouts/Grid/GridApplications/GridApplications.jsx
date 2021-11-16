import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import GridHeader from '../GridHeader/GridHeader'
import './grid-application.scss'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(6),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  containerClass: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    margin: '0 300px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: window.innerWidth,
  },
  buttonContainer: {
    width: '20%',
    minWidth: 116,
    height: 150,
  },
  element: {
    width: '100%',
    minWidth: 116,
    height: '100%',
    minHeight: 100,
    border: 'none',
    backgroundColor: 'white',
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.1)',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 0px 25px -5px rgba(0,0,0,0.61)',
    },
  },
  header: {
    flex: 1,
  },
}))

const GridApplicationItem = ({ el, onCLick }) => {
  const classes = useStyles()

  return (
    <Grid item className={classes.buttonContainer}>
      <div className="element">
        <button
          type="button"
          className="editButton"
          onClick={() => {
            onCLick(el)
          }}
        >
          EDIT
        </button>
        <img alt="logo" className="logoGrid" src={el.iconUrl} />
      </div>
    </Grid>
  )
}

const GridApplications = ({ user, retailerHandler, applications }) => {
  const classes = useStyles()
  const [apps, setApps] = useState(applications)

  const search = word => {
    const temp = applications.filter(el =>
      el.platformName.toLowerCase().includes(word.toLowerCase())
    )
    setApps(temp)
  }

  return (
    <div className={classes.containerClass}>
      <GridHeader search={search} userName={user} className={classes.header} />
      <Grid
        className={classes.body}
        justify="flex-start"
        alignItems="center"
        container
        spacing={3}
      >
        {apps.map(el => (
          <GridApplicationItem
            el={el}
            key={el.platformName}
            onCLick={retailerHandler}
          />
        ))}
      </Grid>
    </div>
  )
}

GridApplications.propTypes = {
  user: PropTypes.string,
  retailerHandler: PropTypes.func,
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      platformId: PropTypes.number,
      platformName: PropTypes.string,
      iconUrl: PropTypes.string,
      logoUrl: PropTypes.string,
    })
  ).isRequired,
}

GridApplications.defaultProps = {
  user: 'user',
  retailerHandler: undefined,
}

export default GridApplications
