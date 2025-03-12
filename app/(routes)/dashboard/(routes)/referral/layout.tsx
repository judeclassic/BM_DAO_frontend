"use client"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useUserFeature } from "@/lib/hooks/user"
import { getUserReferral } from "@/lib/api/user"

const LandingLayout = ({
  children,
}: {
  children: React.ReactNode
})  => {
  const isLoaded = useRef(false);
  useEffect(() => {
    if (isLoaded.current) return;
    getUserReferral({
      level: 1,
      page: 1,
      limit: 10
    })
    isLoaded.current = true;
  }, [])

  return (
    <div>{children}</div>
  )
}

export default LandingLayout