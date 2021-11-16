import { createContext } from 'react'

const ConfigContext = createContext({})

export const ConfigProvider = ConfigContext.Provider
export const ConfigConsumer = ConfigContext.Consumer
export default ConfigContext
