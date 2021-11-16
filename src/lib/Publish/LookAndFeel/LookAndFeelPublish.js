import axios from 'axios'

const LookAndFeelPublish = (retailer, data) => {
  let req = data
  if (typeof data === 'string') {
    try {
      req = JSON.parse(data)
      axios.post(`resources/${retailer}`, req).then(res => console.log(res))
      return true
    } catch (e) {
      return false
    }
  }
  return false
}

export default LookAndFeelPublish
