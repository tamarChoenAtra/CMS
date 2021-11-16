import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import List from '@material-ui/core/List'
import { clientRolesToRoutes } from 'Lib/utils/clientRolesToRoutes'
import 'Assets/css/views/widgets/menu.scss'
import Encode from '../../../lib/Encryption/encode'
import MenuItem from './MenuItem'

const Menu = ({ location, clients, retailer, fetchedRoles }) => {
  return (
    <List className="Menu">
      {clientRolesToRoutes(clients, retailer, fetchedRoles).map(r => (
        <MenuItem
          key={`menu_item-${r.path}`}
          path={`/${Encode(retailer.platformId.toString())}${r.path}`}
          icon={r.icon}
          label={r.label}
          isActive={location.pathname.includes(
            `/${Encode(retailer.platformId.toString())}${r.path}`
          )}
        />
      ))}
    </List>
  )
}

Menu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default withRouter(Menu)
