import routes from 'Config/routes'

export const clientRolesToRoutes = (clients, retailer, fetchedRoles) => {
  const retailerPrefix = fetchedRoles[retailer.platformName]

  const permittedRoutes = []

  Object.keys(clients).forEach((el) => {
    if (
      clients[el].roles.filter((a) => {
        return a.startsWith(retailerPrefix)
      }).length > 0
    ) {
      permittedRoutes.push(el)
    }
  })

  return routes.filter((route) => permittedRoutes.includes(route.roleKeyAccess))
}

/**
 *
 * @param clients
 * @param retailerPrefix
 * @returns {Array}
 * This method map for each Client the user roles for specific retailer/application
 * example -  after user choose Kruidvat (kv) it's return
         app-config:
         0: "kv_app_config_editor"
         1: "kv_app_config_viewer"
         homepage:
         0: "kv_homepage_viewer"
         1: "kv_homepage_editor"
 */
const filterApplicationRolesFromAll = (clients, retailerPrefix) => {
  const retailerApplicationRoles = []

  Object.keys(clients).forEach((el) => {
    const res = clients[el].roles.filter((obj) =>
      obj.startsWith(retailerPrefix)
    )
    retailerApplicationRoles[el] = res
  })

  return retailerApplicationRoles
}

export const clientRolesToPermission = (clients, retailer, roles) => {
  const retailerPrefix = roles[retailer.platformName]

  const clientsRolesArr = filterApplicationRolesFromAll(clients, retailerPrefix)

  const arr = []

  Object.keys(clientsRolesArr).forEach((key) => {
    if (
      clientsRolesArr[key].findIndex((element) => element.includes('edit')) !==
        -1 ||
      clientsRolesArr[key].findIndex((element) =>
        element.includes('publish')
      ) !== -1
    ) {
      arr[key] = 'edit'
    } else {
      arr[key] = 'view'
    }
  })

  return arr
}
