import React from 'react'
import PropTypes from 'prop-types'
import config from 'Config/config'
import setPageTitle from 'Lib/utils/setPageTitle'
import PageHeader from 'Views/widgets/PageHeader/PageHeader'
import SpecialEvents from '@superup/special-events'
import Homepage from '@superup/homepage'
import AppConfig from '@superup/app-config'
import MandatoryUpdate from '@superup/mandatory-update'
import MaintenanceMode from '@superup/maintenance-mode'
import SkipSmsVerification from '@superup/skip-sms-verification'
import DataDashboard from '@superup/data-dashboard'
import SponsoredSpots from '@superup/sponsored-spots'
import BarkerCampaigns from '@superup/barker_campaigns'
import SmartShelfEmulator from '@superup/smartshelf-emulator'
import Content from '@superup/content'
import AppConfigurator from '@superup/app_configurator'
import IntegrationsPanel from '@superup/integrations_panel'
import LookAndFeel from '@superup/look_and_feel'
import DataTable from '@superup/data_table'
// --//

import Encode from '../../lib/Encryption/encode'
import homepagePublish from '../../lib/Publish/Homepage/HomepagePublishChanges'
// import appConfigPublish from '../../lib/Publish/AppConfig/AppConfigPublishChanges'
import mandatoryUpdatePublish from '../../lib/Publish/MandatoryUpdate/MandatoryUpdatePublish'
import MaintenanceModePublish from '../../lib/Publish/MaintenanceMode/MaintenanceModePublish'
import LookAndFeelPublish from '../../lib/Publish/LookAndFeel/LookAndFeelPublish'

import ConfigContext from 'Config/configContext';


class Page extends React.PureComponent {
  constructor(props) {
    super(props)
    const day = 60 * 60 * 24 * 1000
    this.state = {
      publish: undefined,
      buttons: [],
      uatDate: new Date(Date.now() + day),
    }
  }

  static contextType = ConfigContext;

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { title } = this.props
    setPageTitle(title)
  }

  handleUATClick = () => {
    // eslint-disable-next-line no-console
    console.log('handle UAT called!!')
    this.setState({ publish: 'uat' }, () =>
      this.setState({ publish: undefined })
    )
  }

  handlePublishClick = () => {
    // eslint-disable-next-line no-console
    console.log('handle Publish called!!')
    this.setState({ publish: 'prod' }, () =>
      this.setState({ publish: undefined })
    )
  }

  getButtons = (button) => {
    this.setState({ buttons: button })
  }

  setUatDate = (date) => {
    this.setState({ uatDate: date })
  }

  ishomepageEditor = () => {
    const { clients, appConfig, fetchedRoles } = this.props
    const retailerPrefix = fetchedRoles[appConfig.data.platformName]
    if (clients.homepage === undefined) return false
    return clients.homepage.roles.includes(`${retailerPrefix}_homepage_editor`)
  }

  ishomepageUploadActive = () => {
    const { clients, appConfig, fetchedRoles } = this.props
    const retailerPrefix = fetchedRoles[appConfig.data.platformName]
    if (clients['backoffice-cms-fe'] === undefined) return false
    return clients['backoffice-cms-fe'].roles.includes(
      `${retailerPrefix}_upload_files`
    )
  }

  isSSpotsEditor = () => {
    const { clients, appConfig, fetchedRoles } = this.props
    const retailerPrefix = fetchedRoles[appConfig.data.platformName]
    if (clients.sspots === undefined) return false
    return clients.sspots.roles.includes(`${retailerPrefix}_sspots_editor`)
  }

  isConfigurationEditor = () => {
    const { clients, appConfig, fetchedRoles } = this.props
    const retailerPrefix = fetchedRoles[appConfig.data.platformName]
    if (clients.configurator === undefined) return false
    return clients.configurator.roles.includes(`${retailerPrefix}_configurator_editor`)
  }

  isLookAndFeelEditor = () => {
    const { clients, appConfig, fetchedRoles } = this.props
    const retailerPrefix = fetchedRoles[appConfig.data.platformName]
    if (clients['look-and-feel'] === undefined) return false
    return clients['look-and-feel'].roles.includes(`${retailerPrefix}_look-and-feel_editor`)
  }

  isIntegrationsEditor = () => {
    const { clients, appConfig, fetchedRoles } = this.props
    const retailerPrefix = fetchedRoles[appConfig.data.platformName]
    if (clients.integration === undefined) return false
    return clients.integration.roles.includes(`${retailerPrefix}_integration_editor`)
  }

  isBarkerEditor = () => {
    const { clients, appConfig, fetchedRoles } = this.props
    const retailerPrefix = fetchedRoles[appConfig.data.platformName]
    if (clients.barkers === undefined) return false
    return clients.barkers.roles.includes(`${retailerPrefix}_barkers_editor`)
  }

  renderRoutes = (match, isLoading) => {

    const {
      configurationJSON,
      setConfigurationJSON,
      lookAndFeelJSON,
      setLookAndFeelJSON
    } = this.context;
    const {
      appConfig,
      clientPermissions,
      retailer,
      callLoader,
      lockBySingleUser,
      userCode,
      userName,
      roles,
    } = this.props

    const { publish, uatDate } = this.state
    const isHomepageEditor = this.ishomepageEditor()
    const isSSpotsEditor = this.isSSpotsEditor()
    const isBarkerEditor = this.isBarkerEditor()
    const isConfigurationEditor = this.isConfigurationEditor()
    const isHomepageUploadActive = this.ishomepageUploadActive()
    const isIntegrationsEditor = this.isIntegrationsEditor()
    const isLookAndFeelEditor = this.isLookAndFeelEditor()


    if (
      match.path === `/${Encode(retailer.platformId.toString())}/special-events`
    )
      return (
        <SpecialEvents
          config={config}
          isLoading={isLoading}
          getButtons={this.getButtons}
          retailerID={retailer.platformId}
        />
      )
    if (
      match.path === `/${Encode(retailer.platformId.toString())}/app-configurator`
    )
      return (
        <AppConfigurator
          match={match}
          config={config}
          isLoading={isLoading}
          callLoader={callLoader}
          getButtons={this.getButtons}
          retailerID={retailer.platformId}
          appConfig={appConfig}
          isConfigurationEditor={isConfigurationEditor}

          configurationJSON={configurationJSON}
          setConfigurationJSON={setConfigurationJSON}
        />
      )
    if (
      match.path === `/${Encode(retailer.platformId.toString())}/integration-panel`
    )
      return (
        <IntegrationsPanel
          match={match}
          config={config}
          isLoading={isLoading}
          callLoader={callLoader}
          getButtons={this.getButtons}
          retailerID={retailer.platformId}
          appConfig={appConfig}
          isIntegrationsEditor={isIntegrationsEditor}
        />
      )
    // if (
    //   match.path === `/${Encode(retailer.platformId.toString())}/look-and-feel`
    // )
    //   return (
    //     <LookAndFeel
    //       match={match}
    //       config={config}
    //       isLoading={isLoading}
    //       callLoader={callLoader}
    //       getButtons={this.getButtons}
    //       retailerID={retailer.platformId}
    //       appConfig={appConfig}
    //       isIntegrationsEditor={isIntegrationsEditor}
    //     />
    //   )
    if (match.path === `/${Encode(retailer.platformId.toString())}/homepage`)
      return (
        <Homepage
          config={config}
          isLoading={isLoading}
          callLoader={callLoader}
          appConfig={appConfig}
          homepagePublish={homepagePublish}
          publish={publish}
          isHomepageEditor={isHomepageEditor}
          isHomepageUploadActive={isHomepageUploadActive}
          getButtons={this.getButtons}
          retailerID={retailer.platformId}
          lockBySingleUser={lockBySingleUser}
          userCode={userCode}
          userName={userName}
          uatDate={uatDate}
          roles={roles}
        />
      )
    if (
      match.path === `/${Encode(retailer.platformId.toString())}/look-and-feel`
    )
      return (
        <LookAndFeel
          config={config}
          isLoading={isLoading}
          callLoader={callLoader}
          appConfig={appConfig}
          LookAndFeelPublish={LookAndFeelPublish}
          getButtons={this.getButtons}
          retailerID={retailer.platformId}
          isLookAndFeelEditor={isLookAndFeelEditor}

          lookAndFeelJSON={lookAndFeelJSON}
          setLookAndFeelJSON={setLookAndFeelJSON}
        />
      )
    if (
      match.path ===
      `/${Encode(retailer.platformId.toString())}/maintenance-mode`
    )
      return (
        <MaintenanceMode
          config={config}
          isLoading={isLoading}
          callLoader={callLoader}
          appConfig={appConfig}
          MaintenanceModePublish={MaintenanceModePublish}
          getButtons={this.getButtons}
          retailerID={retailer.platformId}
        />
      )
    if (
      match.path ===
      `/${Encode(retailer.platformId.toString())}/sponsored-spots`
    )
      return (
        <SponsoredSpots
          match={match}
          config={config}
          isLoading={isLoading}
          callLoader={callLoader}
          appConfig={appConfig}
          getButtons={this.getButtons}
          retailerID={retailer.platformId}
          isSSpotsEditor={isSSpotsEditor}
        />
      )
    if (
      match.path ===
      `/${Encode(retailer.platformId.toString())}/barker-campaigns`
    )
      return (
        <BarkerCampaigns
          match={match}
          config={config}
          isLoading={isLoading}
          callLoader={callLoader}
          appConfig={appConfig}
          getButtons={this.getButtons}
          retailerID={retailer.platformId}
          isBarkerEditor={isBarkerEditor}
        />
      )
    if (match.path === `/${Encode(retailer.platformId.toString())}/content`)
      return (
        <Content
          match={match}
          config={config}
          isLoading={isLoading}
          callLoader={callLoader}
          appConfig={appConfig}
          getButtons={this.getButtons}
          retailerID={retailer.platformId}
        />
      )
    if (
      match.path === `/${Encode(retailer.platformId.toString())}/data-dashboard`
    )
      return (
        <DataDashboard
          config={config}
          isLoading={isLoading}
          callLoader={callLoader}
          appConfig={appConfig}
          retailerID={retailer.platformId}
        />
      )
    if (match.path === `/${Encode(retailer.platformId.toString())}/data-table`)
      return (
        <div style={{ width: '80vw' }}>
          <DataTable
            match={match}
            config={config}
            isLoading={isLoading}
            callLoader={callLoader}
            appConfig={appConfig}
            retailerID={retailer.platformId}
          />
        </div>
      )
    if (
      match.path ===
      `/${Encode(retailer.platformId.toString())}/smartshelf-emulator`
    )
      return (
        <SmartShelfEmulator
          config={config}
          isLoading={isLoading}
          appConfig={appConfig}
          retailerID={retailer.platformId}
        />
      )
    if (match.path === `/${Encode(retailer.platformId.toString())}/app-config`)
      return (
        <AppConfig
          isLoading={isLoading}
          appConfig={appConfig.data}
          viewOnly={clientPermissions['app-config'] === 'view'}
          getButtons={this.getButtons}
        />
      )
    if (
      match.path ===
      `/${Encode(retailer.platformId.toString())}/skip-verification`
    )
      return (
        <SkipSmsVerification
          config={config}
          isLoading={isLoading}
          callLoader={callLoader}
          appConfig={appConfig}
          LookAndFeelPublish={LookAndFeelPublish}
          getButtons={this.getButtons}
          retailerID={retailer.platformId}
        />
      )
    if (
      match.path ===
      `/${Encode(retailer.platformId.toString())}/mandatory-update`
    )
      return (
        <MandatoryUpdate
          appConfig={appConfig}
          isLoading={isLoading}
          mandatoryUpdatePublish={mandatoryUpdatePublish}
          viewOnly={clientPermissions['mandatory-update'] === 'view'}
          publish={publish}
          getButtons={this.getButtons}
          retailerID={retailer.platformId}
        />
      )
    return <p>{match.path}</p>
  }

  render() {
    const { buttons, uatDate } = this.state
    const { title, match, isLoading, loading, clientPermissions } = this.props
    return (
      <>
        <PageHeader
          loading={loading}
          title={title}
          uatDate={uatDate}
          setUatDate={this.setUatDate}
          onUATClick={this.handleUATClick}
          onPublishClick={this.handlePublishClick}
          isLoading={isLoading}
          buttons={buttons}
          viewOnly={clientPermissions[match.path.replace('/', '')] === 'view'}
        />
        {this.renderRoutes(match, isLoading)}
      </>
    )
  }
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
}

Page.defaultProps = {
  match: {},
  isLoading: false,
}

export default Page
