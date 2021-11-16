import config from 'Config/config'

const setPageTitle = title => {
  document.title = `${title} | ${config.pageTitleSuffix}`
}

export default setPageTitle
