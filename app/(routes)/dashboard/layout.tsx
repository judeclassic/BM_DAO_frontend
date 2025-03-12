"use client"
import React, { useEffect, useRef, useState } from "react"
import { Container, Wrapper } from "../../styles/dashboard-layout.style"
import Sidebar from "./_components/sidebar/sidebar"
import Nav from "./_components/dashbord-nav"
import { LoadingContainer } from "../../styles/auth.style"
import Image from "next/image"
import { useUserFeature } from "@/lib/hooks/user"



const LandingLayout = ({
  children,
}: {
  children: React.ReactNode
})  => {
  const isLoaded = useRef(false);
  const { isLoading, getProfile } = useUserFeature();
  useEffect(() => {
    if (isLoaded.current) return;
    getProfile()
    isLoaded.current = true;
  }, [isLoading])

  return (
    <Container>
      <Sidebar />
      <Nav />
      <Wrapper>
        {children}
      </Wrapper>
      {isLoading ? <LoadingContainer>
            <div>
                <Image src={"/logo-i.svg"} alt="logo" width={44} height={36} />
                <h3>LOADING...</h3>
            </div>
        </LoadingContainer> : null}
    </Container>
  )
}

export default LandingLayout