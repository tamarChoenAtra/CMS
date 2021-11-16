import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppBar from 'Views/layouts/AppBar/AppBar'
import GridApplications from '../Grid/GridApplications/GridApplications'

class Applications extends React.PureComponent {
  constructor(props) {
    super(props)
    const { applications } = this.props
    this.state = { applications }
  }

  componentWillMount() {
    const { applications } = this.props

    function compare(a, b) {
      if (a.platformId < b.platformId) {
        return -1
      }
      if (a.platformId > b.platformId) {
        return 1
      }
      return 0
    }
    const temp = applications.sort(compare)
    this.setState({ applications: temp })
  }

  render() {
    const {
      children,
      retailer,
      isLoading,
      handelElementClick,
      auth,
      onLogoutClick,
    } = this.props

    const { applications } = this.state
    if (!retailer) {
      return (
        <div className="App">
          <AppBar
            isLoading={isLoading}
            onLogoutClick={onLogoutClick}
            user={auth.getUserName()}
            access={auth.getRealmAccess()}
          />
          {applications.length > 1 ? (
            <GridApplications
              user={auth.getUserName()}
              retailerHandler={handelElementClick}
              applications={applications}
            />
          ) : (
            handelElementClick(applications[0])
          )}
        </div>
      )
    }
    return <BrowserRouter> {children} </BrowserRouter>
  }
}

export default Applications
