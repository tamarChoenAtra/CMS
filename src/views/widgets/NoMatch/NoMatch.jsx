import React from 'react'
import PropTypes from 'prop-types'

const NoMatch = ({ location }) => (
  <div>
    <h3>
      URL <code>{location.pathname}</code> was not found
    </h3>
  </div>
)

NoMatch.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default NoMatch
