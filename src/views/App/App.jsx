import React from 'react'
import axios from 'axios'
import conf from 'Config/config'
import Auth from 'Lib/Auth/Auth'
import AppBar from 'Views/layouts/AppBar/AppBar'
import SideBar from 'Views/layouts/SideBar/SideBar'
import Main from 'Views/layouts/Main/Main'
import 'Assets/css/views/app.scss'
import IdleTimer from 'react-idle-timer'
import getRoles from 'Lib/utils/getRoles'
import Decode from '../../lib/Encryption/decode'
import Applications from '../layouts/Applications/Applications'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      authenticated: false,
      axiosInitialized: false,
      retailerId: undefined,
      applications: [],
      applicationInitialized: false,
      appConfig: undefined,
      redirect: false,
      fetchedRoles: '',
    }
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'test') {
      return
    }

    const keycloakConfig = {
      realm: 'Backoffice',
      url: 'https://keycloak-k8s-tst.superup.io/auth',
      clientId: 'backoffice-cms-fe',
    }
    

    this.auth = new Auth(keycloakConfig)
    this.auth.login(this.onLoginSuccess)
  }

  onLoginSuccess = authenticated => {
    this.setState(
      {
        authenticated,
      },
      () => {
        if (authenticated) {
          this.setAxiosInterceptors()
          this.loadApplications()
          this.refreshApp()
        }
      }
    )
  }

  onLoginError = error => {
    // eslint-disable-next-line no-console
    console.error(error)
  }

  setAxiosInterceptors = () => {
    axios.interceptors.request.use(
      config => {
        const axiosConfig = config
        this.setState({ isLoading: true })
        axiosConfig.headers.Authorization = `Bearer ${this.auth.getToken()}`
        const { retailerId } = this.state
        if (retailerId)
          axiosConfig.headers.applicationId = retailerId.platformId
        return axiosConfig
      },
      error => {
        this.setState({ isLoading: false })
        return Promise.reject(error)
      }
    )

    axios.interceptors.response.use(
      response => {
        this.setState({ isLoading: false })
        return response
      },
      error => {
        this.setState({ isLoading: false })
        return Promise.reject(error)
      }
    )

    const {
      config: { JAVA_API_URL },
    } = this.props
    axios.defaults.baseURL = JAVA_API_URL

    this.setState({
      axiosInitialized: true,
    })
  }

  callLoader = () => {
    const { isLoading } = this.state;
    this.setState({ isLoading: !isLoading })
  }

  loadApplications = () => {
    axios
      .get(`admin/platforms`)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            applications: response.data.data,
            applicationInitialized: true,
          })
        } else {
          this.auth.logout()
        }
      })
      .catch(() => {
        const {
          config: { JAVA_API_URL },
        } = this.props
        alert(JAVA_API_URL)
        // this.auth.logout()
      })
    getRoles().then(response => {
      if (response.status === 200) {
        this.setState({
          fetchedRoles: { ...response.data.data },
        })
      }
    })
  }

  refreshApp = () => {
    const { retailerId, redirect } = this.state
    function findIdFromURL(URL, index) {
      const tempUrl = URL.replace(/^https?:\/\//, '').split('/')[index]

      return Decode(tempUrl)
    }

    const tempId = findIdFromURL(document.URL, 1)

    if (
      retailerId === undefined &&
      tempId !== undefined &&
      tempId !== '' &&
      redirect === false
    ) {
      setTimeout(() => {
        axios
          .get(`admin/platforms/${tempId.toString()}`)
          .then(response => {
            if (response.status === 200) {
              this.setState({
                appConfig: response.data,
                retailerId: {
                  platformId: response.data.data.platformId,
                  platformName: response.data.data.platformName,
                  iconUrl: response.data.data.iconUrl,
                  logoUrl: response.data.data.logoUrl,
                  topLogoUrl: response.data.data.topLogoUrl,
                },
              })
            }
          })
          .catch(error => {
            console.log(error.message)
            this.setState({ redirect: true })
            window.history.pushState(
              'data',
              'Title',
              `https://${document.URL.replace(/^https?:\/\//, '').split('/')[0]
              }`
            )
          })
      }, 200)
    }
  }

  onLogout = () => {
    try {
      const { retailerId } = this.state
      const headers = {
        applicationId: retailerId.platformId,
      }
      axios.post(`/homepage/info/logout`, {}, { headers }).then(() => {
        this.auth.logout()
      })
    } catch (error) {
      this.auth.logout()
      throw new Error(`Logout Failed`)
    }
  }

  render() {
    const {
      isLoading,
      authenticated,
      axiosInitialized,
      retailerId,
      applicationInitialized,
      applications,
      appConfig,
      fetchedRoles,
    } = this.state
    if (!authenticated || !axiosInitialized || !applicationInitialized) {
      return <div className="unauthenticated">Loading ...</div>
    }

    const handelElementClick = el => {
      axios.get(`admin/platforms/${el.platformId}`).then(response => {
        this.setState({ appConfig: response.data, retailerId: el })
      })
    }

    const unCheckRetailer = () => {
      this.setState({ retailerId: 0 })
    }

    return (
      <Applications
        retailer={retailerId}
        isLoading={isLoading}
        handelElementClick={handelElementClick}
        applications={applications}
        auth={this.auth}
        loading={this.loading}
        onLogoutClick={this.onLogout}
      >
      <>
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref
          }}
          element={document}
          onIdle={() => {
            console.log('onIdle')
            this.onLogout()
          }}
          debounce={250}
          timeout={1000 * 60 * 10}
        />
        <div className="App">
          <AppBar
            isLoading={isLoading}
            onLogoutClick={this.onLogout}
            user={this.auth.getUserName()}
          />
          <SideBar
            applications={applications}
            retailer={retailerId}
            clients={this.auth.getUserClientAccess()}
            unCheckRetailer={unCheckRetailer}
            fetchedRoles={fetchedRoles}
          />
          <Main
            callLoader={this.callLoader}
            retailer={retailerId}
            clients={this.auth.getUserClientAccess()}
            roles={this.auth.getRealmAccess()}
            isLoading={isLoading}
            appConfig={appConfig}
            userCode={this.auth.getUserCode()}
            userName={this.auth.getUserName()}
            fetchedRoles={fetchedRoles}
          />
        </div>
        </>
       </Applications>
    )
  }
}

export default App
