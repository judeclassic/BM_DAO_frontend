import React from 'react'
import RaidDetail from '../../../_components/raid-detail'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <><RaidDetail id={params.id}/></>
  )
}

export default Page