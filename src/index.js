import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'
import 'typeface-montserrat'
import App from 'Views/App/App'
import 'Assets/css/index.scss'
import { unregister } from './registerServiceWorker'
import theme from './lib/theme'
import config from './config/config'
// import 'bootstrap/dist/css/bootstrap.css'
import "font-awesome/css/font-awesome.css";

import ConfigContainer from 'Config/ConfigContainer/ConfigContainer'
import './index.css'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <ConfigContainer>
        <App config={config} />
      </ConfigContainer>
    </StylesProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
unregister()
