import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import WelcomeImage from 'Assets/images/welcome-img.svg'
import Encode from '../../../lib/Encryption/encode'
import './welcome-styles.scss'

class Welcome extends React.PureComponent {
  render() {
    const { permittedRoutes, retailer } = this.props
    return (
      <Grid className="welcome-page" container spacing={3}>
        <Grid className="welcome-page-title-grid" item xs={12}>
          <h3 className="welcome-page-title">So, what do you wish to do?</h3>
        </Grid>
        <Grid className="welcome-page-image-grid" item xs={12}>
          <img
            className="welcome-page-image"
            alt="Welcome Page"
            src={WelcomeImage}
          />
        </Grid>
        <Grid className="welcome-page-buttons" item xs={12}>
          <div className="welcome-page-button">
            {permittedRoutes.map(pack => {
              return (
                <Grid
                  className="welcome-page-button-grid"
                  key={pack.path}
                  item
                  xs={3}
                >
                  <Link
                    className="welcome-button-link"
                    to={`/${Encode(retailer.platformId.toString())}${
                      pack.path
                    }`}
                  >
                    <Button
                      classes={{
                        label: 'welcome-button-label',
                      }}
                    >
                      {pack.icon}
                      {pack.label}
                    </Button>
                  </Link>
                </Grid>
              )
            })}
          </div>
        </Grid>
      </Grid>
    )
  }
}
export default Welcome
