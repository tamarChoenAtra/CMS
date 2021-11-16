import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import ChevronLeftNormal from 'Assets/images/chevron-left-normal.svg'
import ChevronLeftHover from 'Assets/images/chevron-left-hover.svg'
import 'Assets/css/views/widgets/menu.scss'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import cssVars from 'Assets/css/variables.scss'

const useStyles = makeStyles(theme => ({
  headerContainer: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  backButton: {
    marginRight: 28,
    textTransform: 'none',
    transition: theme.transitions.create('color'),
    '&:hover': {
      color: cssVars.primaryColor,
      backgroundColor: 'transparent',
      '& $chevron': {
        backgroundImage: `url(${ChevronLeftHover})`,
      },
    },
  },
  chevron: {
    height: 18,
    width: 18,
    backgroundImage: `url(${ChevronLeftNormal})`,
    transition: theme.transitions.create('background-image'),
    backgroundRepeat: 'no-repeat',
    marginRight: 10,
  },
  paper: {
    paddingTop: 10,
    paddingBottom: 16,
    textAlign: 'center',
  },
  img: {
    maxWidth: 115,
    maxHeight: 80,
  },
  platformName: {
    fontSize: 17,
    fontWeight: 800,
  },
  headerLink: {
    textDecoration: 'none',
  },
}))

const Header = ({ retailer, unCheckRetailer, applications }) => {
  const classes = useStyles()

  return (
    <div className={classes.headerContainer}>
      {applications && applications.length > 1 ? (
        <Link className={classes.headerLink} to="/">
          <Button className={classes.backButton} onClick={unCheckRetailer}>
            <span className={classes.chevron} />
            <span className={classes.platformName}>
              {retailer.platformName}
            </span>
          </Button>
        </Link>
      ) : (
        <span className={classes.platformName}>{retailer.platformName}</span>
      )}
      <div className={classes.paper}>
        <img alt="logo" className={classes.img} src={retailer.iconUrl} />
      </div>
    </div>
  )
}

Header.propTypes = {
  retailer: PropTypes.shape({
    platformName: PropTypes.string,
    icon: PropTypes.string,
  }),
  unCheckRetailer: PropTypes.func.isRequired,
}

Header.defaultProps = {
  retailer: {},
}
export default Header
