"use client"
import React, { useEffect, useRef } from "react"
import Image from "next/image"
import { useClientRaiderTaskFeature } from "@/lib/hooks/client/raider-task"
import { LoadingContainer } from "@/app/styles/auth.style"
import Nav from "../../../_components/dashbord-nav"
import Sidebar from "../../../_components/sidebar"
import { Container, Wrapper } from "@/app/styles/dashboard-layout.style"

const ClientLayout = ({
  children,
}: {
  children: React.ReactNode
})  => {
  const isLoaded = useRef(false);
  const { isLoading, getRaiderTasks } = useClientRaiderTaskFeature();

  useEffect(() => {
    if (isLoaded.current) return;
    getRaiderTasks({
        limit: 10,
        page: 1
    })
    isLoaded.current = true;
  }, [isLoading])

  return (
    <>
        {children}
    </>
  )
}

export default ClientLayout