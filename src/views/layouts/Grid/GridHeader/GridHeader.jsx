import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'

const styles = {
  root: {
    textDecoration: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: window.innerHeight / 10,
    textAlign: 'center',
  },
  searchText: {
    fontWeight: 'normal',
  },
  textField: {
    marginLeft: 1,
    marginRight: 1,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  textfieldHeight: {
    height: 'unset',
  },
}

const GridHeader = ({ classes, userName, search }) => {
  const handleChange = () => (event) => {
    search(event.target.value)
  }
  return (
    <div className={classes.root}>
      <div>Hi {userName},</div>
      <div>Great to see you again!</div>
      <br />
      <div className={classes.searchText}>
        To begin, select the platform you wish to edit:
      </div>
      <TextField
        id="standard-dense"
        label="Search..."
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        onChange={handleChange()}
        InputProps={{ classes: { input: classes.textfieldHeight } }}
      />
    </div>
  )
}

GridHeader.propTypes = {
  search: PropTypes.func.isRequired,
  userName: PropTypes.string,
}

GridHeader.defaultProps = {
  userName: 'user',
}
export default withStyles(styles)(GridHeader)
