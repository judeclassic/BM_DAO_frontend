import React from 'react'
import VerifyEmail from './verifyEmail'
import { Metadata } from 'next'

const Page = () => {
  return (
    <VerifyEmail />
  )
}
export const metadata: Metadata =  {
  title: "BM DAO | EmialVerification"
}

export default Page