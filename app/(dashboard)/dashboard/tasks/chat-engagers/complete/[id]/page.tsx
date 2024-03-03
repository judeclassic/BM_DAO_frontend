import React from 'react'
import ChatEngagers from './chat-engagers'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <><ChatEngagers id={params.id}/></>
  )
}

export default Page