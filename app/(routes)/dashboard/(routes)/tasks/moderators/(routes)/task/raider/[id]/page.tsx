import React from 'react'
import TaskDetails from '../_components/task-details'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <TaskDetails id={params.id}/>
    </>
  )
}

export default Page