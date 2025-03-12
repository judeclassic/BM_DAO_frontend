import React from 'react'
import TaskDetails from '../../_components/task-detail'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <><TaskDetails id={params.id}/></>
  )
}

export default Page