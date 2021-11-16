import { useState, useEffect } from 'react'
import getRoles from 'Lib/utils/getRoles'

const retailerToPrefix = retailerName => {
  const [fetchedData, setFetchedData] = useState('')

  useEffect(() => {
    getRoles().then(res => setFetchedData(res.data.data))
  }, [])
  if (fetchedData !== '') {
    return fetchedData[retailerName]
  }
  return null
}
export default retailerToPrefix
