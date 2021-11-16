import React from 'react'
import PropTypes from 'prop-types'
import 'Assets/css/views/widgets/error-boundary.scss'

class ErrorBoundary extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    const { errorInfo, error } = this.state
    if (errorInfo) {
      // You can render any custom fallback UI
      return (
        <div className="ErrorBoundary error">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      )
    }

    const { children } = this.props
    return children
  }
}

export default ErrorBoundary
