import React from 'react'
import Grid from '@material-ui/core/Grid'
import logo from 'Assets/images/logo.png'
import 'Assets/css/views/layouts/footer.scss'

const Footer = () => (
  <Grid
    className="Footer"
    container
    direction="column"
    justify="center"
    alignItems="center"
  >
    <img alt="Superup Logo" src={logo} />
    <p>Powered by Shelfy</p>
  </Grid>
)

export default Footer
