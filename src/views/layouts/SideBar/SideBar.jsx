import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Menu from 'Views/widgets/Menu/Menu'
import Footer from 'Views/layouts/Footer/Footer'
import Header from 'Views/widgets/Header/Header'

const drawerWidth = 200

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    paddingTop: 37,
    height: 'calc(100% - 64px)',
    textAlign: 'left',
  },
  h1: {
    paddingLeft: 20,
  },
  menuContainer: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  header: {
    backgroundColor: 'red',
  },
})

const SideBar = ({
  classes,
  retailer,
  unCheckRetailer,
  clients,
  applications,
  fetchedRoles,
}) => (
  <Drawer
    variant="permanent"
    className={classes.drawer}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    {/* div below is necessary for leaving 'toolbar height' margin */}
    <div className={classes.toolbar} />
    <div className={classes.content}>
      <Header
        className={classes.header}
        retailer={retailer}
        applications={applications}
        unCheckRetailer={unCheckRetailer}
      />
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        className={classes.menuContainer}
      >
        <Menu
          clients={clients}
          retailer={retailer}
          fetchedRoles={fetchedRoles}
        />
        <Footer />
      </Grid>
    </div>
  </Drawer>
)

SideBar.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string,
    drawer: PropTypes.string,
    drawerPaper: PropTypes.string,
    h1: PropTypes.string,
    menuContainer: PropTypes.string,
    toolbar: PropTypes.string,
  }).isRequired,
}

export default withStyles(styles)(SideBar)
