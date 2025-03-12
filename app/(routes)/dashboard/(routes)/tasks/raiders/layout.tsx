"use client"
import { useRaiderAccountFeature } from "@/lib/hooks/raider/account";
import React, { useEffect, useRef } from "react"

const RaiderLayout = ({
  children,
}: {
  children: React.ReactNode
})  => {
  const isLoaded = useRef(false);
  const { isLoading, getRaiderAccount } = useRaiderAccountFeature();

  useEffect(() => {
    if (isLoaded.current) return;
    getRaiderAccount()
    isLoaded.current = true;
  }, [isLoading])
  
  return (
    <>
        {children}
    </>
  )
}

export default RaiderLayout