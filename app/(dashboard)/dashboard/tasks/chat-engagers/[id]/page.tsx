import React from 'react'
import ChatDetails from './chat-details'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <><ChatDetails id={params.id}/></>
  )
}

export default Page