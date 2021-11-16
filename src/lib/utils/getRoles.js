import axios from 'axios'

const getRoles = () => {
  return axios.get(`admin/platforms/roles`)
}

export default getRoles
