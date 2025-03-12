"use client"
import { useModeratorAccountFeature } from "@/lib/hooks/moderator/account";
import { useRaiderAccountFeature } from "@/lib/hooks/raider/account";
import React, { useEffect, useRef } from "react"

const RaiderLayout = ({
  children,
}: {
  children: React.ReactNode
})  => {
  const isLoaded = useRef(false);
  const { isLoading, getModeratorAccount } = useModeratorAccountFeature();

  useEffect(() => {
    if (isLoaded.current) return;
    getModeratorAccount()
    isLoaded.current = true;
  }, [isLoading])
  
  return (
    <>
        {children}
    </>
  )
}

export default RaiderLayout