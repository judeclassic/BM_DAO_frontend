import React from 'react'
import TaskDetails from './task-details'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <><TaskDetails id={params.id}/></>
  )
}

export default Page