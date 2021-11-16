import axios from 'axios'

const MaintenanceModePublish = (retailer, data) => {
  let req = data
  if (typeof data === 'string') {
    try {
      req = JSON.parse(data)
      console.log(req)
      axios
        .post(`maintenance/add/${retailer}`, req)
        .then(res => console.log(res))
      return true
    } catch (e) {
      return false
    }
  }
  return false
}

export default MaintenanceModePublish
