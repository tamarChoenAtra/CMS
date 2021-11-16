import React, { useEffect, useState } from 'react'
import { ConfigProvider } from '../configContext'

const ConfigContainer = ({ children }) => {
  const [configurationJSON, setConfigurationJSON] = useState(null);
  const [lookAndFeelJSON, setLookAndFeelJSON] = useState(null);

  useEffect(() => {
    debugger
  }, [lookAndFeelJSON])

  const configuration = {
    configurationJSON,
    setConfigurationJSON,
    lookAndFeelJSON,
    setLookAndFeelJSON
  }
  return <ConfigProvider value={configuration}>{children}</ConfigProvider>
}

export default ConfigContainer
