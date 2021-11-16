import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import LinearProgress from '@material-ui/core/LinearProgress'
import LogoutIcon from '@material-ui/icons/KeyboardArrowDown'
import AccountImageIcon from '@material-ui/icons/AccountCircle'
import logo from 'Assets/images/logo.png'
import logoutLogo from 'Assets/images/load.svg'
import 'Assets/css/views/layouts/app-bar.scss'
import packageJson from '../../../../package.json'

function SUAppBar(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const { isLoading, onLogoutClick, user, access } = props

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <AppBar position="fixed" className="AppBar">
      <Toolbar className="Toolbar">
        <Grid container spacing={2}>
          <Grid className="logo" item xs={6}>
            <img alt="Superup Logo" src={logo} />
          </Grid>
          <Grid className="appbar-buttons" item xs={6}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
              classes={{
                label: 'appbar-profile-button',
              }}
            >
              <AccountImageIcon className="appbar-profile-image" />
              {user}
              <LogoutIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              elevation={0}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                className="appbar-user-modal-item"
                onClick={onLogoutClick}
              >
                <img
                  className="appbar-logout-icon"
                  alt="logout icon"
                  src={logoutLogo}
                />
                Logout
              </MenuItem>
              {access && access.includes('logs_viewer') ? (
                <MenuItem className="appbar-user-modal-item">
                  V {packageJson.version}
                </MenuItem>
              ) : null}
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
      {isLoading && <LinearProgress color="secondary" />}
    </AppBar>
  )
}

// SUAppBar.propTypes = {
//   isLoading: PropTypes.bool,
//   onLogoutClick: PropTypes.func,
// }

// SUAppBar.defaultProps = {
//   isLoading: true,
//   onLogoutClick: undefined,
// }

export default SUAppBar
