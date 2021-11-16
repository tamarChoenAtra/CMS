import btoa from 'btoa'

const Encode = data => {
  let enc = ''
  if (typeof data === 'string') {
    enc = btoa(data)
  }
  return enc
}

export default Encode
