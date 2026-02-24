import AdminWrapper from '@/Components/AdminComponents/AdminWrapper'
import React from 'react'
import Addroom from './Addroom'

const Adminrooms = () => {
  return (
<AdminWrapper activeTab="rooms">
  <Addroom/>
</AdminWrapper>
  )
}

export default Adminrooms