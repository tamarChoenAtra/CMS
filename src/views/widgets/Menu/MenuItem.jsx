import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const styles = {
  link: {
    textDecoration: 'none',
  },
  listItem: {
    paddingLeft: 17,
  },
  isActive: {
    backgroundColor: '#3366ff',
  },
  listItemIcon: {
    color: 'black',
    minWidth: 32,
  },
  listItemText: {
    fontSize: 12,
    paddingLeft: 0,
    paddingRight: 0,
    color: 'black',
  },
}

const MenuItem = ({ path, icon, label, isActive, classes }) => (
  <Link to={path} className={classes.link}>
    <ListItem
      button
      className={classNames('MenuItem', classes.listItem, {
        isActive,
      })}
    >
      <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
      <ListItemText
        disableTypography
        primary={label}
        className={classes.listItemText}
      />
    </ListItem>
  </Link>
)

MenuItem.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string,
  isActive: PropTypes.bool,
  classes: PropTypes.shape({
    link: PropTypes.string,
    listItem: PropTypes.string,
    isActive: PropTypes.string,
    listItemIcon: PropTypes.string,
    listItemText: PropTypes.string,
  }).isRequired,
}

MenuItem.defaultProps = {
  label: 'MenuItem Label',
  isActive: false,
}

export default withStyles(styles)(MenuItem)
