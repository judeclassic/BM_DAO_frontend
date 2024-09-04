import React from 'react'
import ForgotPassword from './forgotPassword'
import { Metadata } from 'next'

const Page = () => {
  return (
    <ForgotPassword />
  )
}
export const metadata: Metadata =  {
  title: "BM DAO | ForgotPassword"
}

export default Page