import React from 'react'
import ForgotPassword from '../../_components/forgot-password'
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