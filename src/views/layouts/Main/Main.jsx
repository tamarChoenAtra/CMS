import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Switch, Redirect, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Page from 'Views/Page/Page'
import ErrorBoundary from 'Views/widgets/ErrorBoundary/ErrorBoundary'
import NoMatch from 'Views/widgets/NoMatch/NoMatch'
import 'Assets/css/views/layouts/main.scss'
import Welcome from 'Views/widgets/Welcome/Welcome'
import Encode from 'Lib/Encryption/encode'
import {
  clientRolesToRoutes,
  clientRolesToPermission,
} from 'Lib/utils/clientRolesToRoutes'
import MessagePopup from 'Views/widgets/MessagePopUp/MessagePopUp'

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
})

const Main = ({
  classes,
  isLoading,
  callLoader,
  retailer,
  clients,
  appConfig,
  userCode,
  keyClockUserName,
  roles,
  fetchedRoles,
}) => {
  const [singleUserLock, setSingleUserLock] = useState(null)
  const permittedRoutes = clientRolesToRoutes(clients, retailer, fetchedRoles)
  const clientPermissions = clientRolesToPermission(
    clients,
    retailer,
    fetchedRoles
  )

  const lockBySingleUser = (packageName, userName) => {
    const singleUserLockObj = {
      packageName,
      userName,
    }
    setSingleUserLock(singleUserLockObj)
  }

  return (
    <div className="Main">
      {/* div below is necessary for leaving 'toolbar height' margin */}
      <div className={classes.toolbar} />
      <main>
        <ErrorBoundary>
          <Switch>
            {permittedRoutes.map((r) => {
              return (
                <Route
                  key={`main-${r.path}`}
                  path={`/${Encode(retailer.platformId.toString())}${r.path}`}
                  render={(props) => (
                    <Page
                      {...props}
                      retailer={retailer}
                      appConfig={appConfig}
                      isLoading={isLoading}
                      title={r.label}
                      callLoader={callLoader}
                      clientPermissions={clientPermissions}
                      lockBySingleUser={lockBySingleUser}
                      userCode={userCode}
                      userName={keyClockUserName}
                      roles={roles}
                      clients={clients}
                      fetchedRoles={fetchedRoles}
                    />
                  )}
                />
              )
            })}
            {permittedRoutes.length > 1 || permittedRoutes.length === 0 ? (
              <Route
                path={`/${Encode(retailer.platformId.toString())}/welcome`}
                component={() => (
                  <Welcome
                    permittedRoutes={permittedRoutes}
                    retailer={retailer}
                  />
                )}
              />
            ) : (
              <Redirect
                to={`/${Encode(retailer.platformId.toString())}${
                  permittedRoutes[0].path
                }`}
              />
            )}
            <Redirect
              from="/"
              to={`/${Encode(retailer.platformId.toString())}/welcome`}
            />
            <Route component={NoMatch} />
          </Switch>
          {singleUserLock && (
            <>
              <Redirect
                to={`/${Encode(retailer.platformId.toString())}/welcome`}
              />
              <MessagePopup
                openPopUp={singleUserLock !== null}
                closeAction={() => {
                  setSingleUserLock(null)
                }}
                popUpMessage={`Oops! ${singleUserLock.packageName} is currently locked by ${singleUserLock.userName}`}
                buttonText="GOT IT"
                buttonAction={() => {
                  setSingleUserLock(null)
                }}
              />
            </>
          )}
        </ErrorBoundary>
      </main>
    </div>
  )
}
Main.propTypes = {
  classes: PropTypes.shape({
    toolbar: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool,
}

Main.defaultProps = {
  isLoading: false,
}

export default withStyles(styles)(Main)
