import Keycloak from 'keycloak-js'

export default class Auth {
  constructor(keycloakConfig) {
    this.keycloakConfig = keycloakConfig
  }

  login = (onSuccess, onError) => {
    this.keycloakObj = Keycloak(this.keycloakConfig)
    this.keycloakObj
      .init({ onLoad: 'login-required' })
      .then(authenticated => onSuccess(authenticated))
      .catch(error => onError(error))
    // this.keycloakObj.onTokenExpired = () => {
    //   this.keycloakObj
    //     .updateToken(5)
    //     .success(refreshed => {
    //       if (refreshed) {
    //       }
    //     })
    //     .error(() => {
    //       console.error(
    //         'Failed to refresh the token, or the session has expired'
    //       )
    //       this.logout()
    //     })
    // }
  }

  logout = () => {
    this.keycloakObj.logout()
    this.keycloakObj = null
  }

  getToken = () => this.keycloakObj.token

  getUserName = () => this.keycloakObj.tokenParsed.name

  getUserCode = () => this.keycloakObj.subject

  getUserClientAccess = () => this.keycloakObj.resourceAccess

  getRealmAccess = () => this.keycloakObj.realmAccess.roles
}
