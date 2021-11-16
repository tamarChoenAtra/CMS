import axios from 'axios'

const appConfigPublish = (retailer, data) => {
  let req = data
  if (typeof data === 'string') {
    try {
      req = JSON.parse(data)
      console.log(req)
      axios
        .post(`appconfig/${retailer}`, { app_config: req })
        .then(res => console.log(res))
      return true
    } catch (e) {
      return false
    }
  }
  return false
}

export default appConfigPublish
