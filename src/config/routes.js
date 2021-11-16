import React from 'react'
import HomepageIcon from '@material-ui/icons/Home'
import ContentManagerIcon from '@material-ui/icons/LiveTv'
import CampaignManagerIcon from '@material-ui/icons/RssFeed'
import ProductManagerIcon from '@material-ui/icons/LocalFlorist'
import Icon from '@mui/material/Icon';
import UITextEditorIcon from '@material-ui/icons/Notes'
// import LookAndFeelIcon from '@material-ui/icons/Palette'
import CheckoutBuilderIcon from '@material-ui/icons/ShoppingBasket'
import OrderManagementIcon from '@material-ui/icons/AssignmentOutlined'
import SpecialEventsIcon from '@material-ui/icons/Whatshot'
import AppConfigIcon from '@material-ui/icons/Build'
import IntegrationIcon from  '@mui/icons-material/AutoGraph';
import SystemUpdate from '@material-ui/icons/SystemUpdate'
import LookAndFeelIcon from '@material-ui/icons/ColorLens'
import MaintenanceIcon from '@material-ui/icons/SettingsInputHdmi'
// import AdminPanelIcon from '@material-ui/icons/Person'
import DataDashboardIcon from '@material-ui/icons/Dashboard'
import SponsoredSpotsIcon from '@material-ui/icons/ViewCarousel'
import BarkerCampaignsIcon from '@material-ui/icons/Dns'
import ContentIcon from '@material-ui/icons/Dvr'
import SShelfEmulatorIcon from '@material-ui/icons/VerifiedUser'
import DataTableIcon from '@material-ui/icons/TableChart'
import IntegrationsIcon from '@mui/icons-material/FlashOnOutlined';
import ConfigIcon from '@mui/icons-material/Tune';

const routes = [
  {
    path: '/homepage',
    label: 'Homepage',
    icon: <HomepageIcon />,
    roleKeyAccess: 'homepage',
  },
  {
    path: '/content-manager',
    label: 'Content Manager',
    icon: <ContentManagerIcon />,
    roleKeyAccess: 'content-manager',
  },
  {
    path: '/campaign-manager',
    label: 'Campaign Manager',
    icon: <CampaignManagerIcon />,
    roleKeyAccess: 'campaign-manager',
  },
  {
    path: '/product-manager',
    label: 'Product Manager',
    icon: <ProductManagerIcon />,
    roleKeyAccess: 'product-manager',
  },
  {
    path: '/ui-text-editor',
    label: 'UI Text Editor',
    icon: <UITextEditorIcon />,
    roleKeyAccess: 'ui-text-editor',
  },
  // {
  //   path: '/app-customizer',
  //   label: 'App Customizer',
  //   icon: <AppCustomizerIcon />,
  // },
  {
    path: '/checkout-builder',
    label: 'Checkout Builder',
    icon: <CheckoutBuilderIcon />,
    roleKeyAccess: 'checkout-builder',
  },
  {
    path: '/order-management',
    label: 'Order Management',
    icon: <OrderManagementIcon />,
    roleKeyAccess: 'order-management',
  },
  {
    path: '/special-events',
    label: 'Special Events',
    icon: <SpecialEventsIcon />,
    roleKeyAccess: 'special-events',
  },
  {
    path: '/app-config',
    label: 'App Config',
    icon: <AppConfigIcon />,
    roleKeyAccess: 'app-config',
  },
  {
    path: '/mandatory-update',
    label: 'Mandatory Update',
    icon: <SystemUpdate />,
    roleKeyAccess: 'mandatory-update',
  },
  {
    path: '/look-and-feel',
    label: 'Look & Feel',
    icon: <LookAndFeelIcon />,
    roleKeyAccess: 'look-and-feel',
  },
  {
    path: '/maintenance-mode',
    label: 'Maintenance Mode',
    icon: <MaintenanceIcon />,
    roleKeyAccess: 'maintenance-mode',
  },
  {
    path: '/skip-verification',
    label: 'Skip SMS Verification',
    icon: <LookAndFeelIcon />,
    roleKeyAccess: 'skip-verification',
  },
  {
    path: '/data-dashboard',
    label: 'Data Dashboard',
    icon: <DataDashboardIcon />,
    roleKeyAccess: 'dashboard',
  },
  {
    path: '/sponsored-spots',
    label: 'Sponsored spots',
    icon: <SponsoredSpotsIcon />,
    roleKeyAccess: 'sspots',
  },
  {
    path: '/barker-campaigns',
    label: 'Barker Campaigns',
    icon: <BarkerCampaignsIcon />,
    roleKeyAccess: 'barkers',
  },
  {
    path: '/content',
    label: 'Content',
    icon: <ContentIcon />,
    roleKeyAccess: 'content',
  },
  {
    path: '/smartshelf-emulator',
    label: 'SmartShelf Emulator',
    icon: <SShelfEmulatorIcon />,
    roleKeyAccess: 'ss-emulator',
  },
  {
    path: '/data-table',
    label: 'Data Table',
    icon: <DataTableIcon />,
    roleKeyAccess: 'barkers',
  },
  {
    path: '/app-configurator',
    label: 'App Configurator',
    icon: <ConfigIcon />,
    roleKeyAccess: 'configurator',
  },
  {
    path: '/integration-panel',
    label: 'Integrations Panel',
    icon:<IntegrationsIcon/>,
    roleKeyAccess: 'integration',
  }
]

export default routes
