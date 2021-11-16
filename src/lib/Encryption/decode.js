import atob from 'atob'

const Decode = data => {
  let dec = ''
  if (typeof data === 'string') {
    dec = atob(data)
  }
  return dec
}

export default Decode
