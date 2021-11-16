import axios from 'axios'

const mandatoryUpdatePublish = (applicationId, data) => {
  console.log(data)
  axios.post(`mandatory/${applicationId}`, data).then(res => console.log(res))
}

export default mandatoryUpdatePublish
