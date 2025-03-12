import React from 'react'
import Overview from './overview'
import { Metadata } from 'next'

const Page = () => {
  return (<Overview />)
}

export const metadata: Metadata =  {
  title: "BM DAO | Overview"
}

export default Page;