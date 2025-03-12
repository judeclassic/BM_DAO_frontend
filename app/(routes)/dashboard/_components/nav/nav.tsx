"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Auth, Container, Dropdown, Links, Logo, MAuth, MLinks, NavLink, Wrapper } from './style'
import { useRouter, usePathname } from 'next/navigation'

const Nav = () => {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);


  // Track if the page is scrolled then the styling of the nav is updated
  const handleScroll = (e: Event) => {
    if((document.body.scrollTop > 100) || document.documentElement.scrollTop > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])
  
  return (
    <Container $isScrolled={scrolled}>
      <Wrapper>
        <Logo>
          <Image src={"/logo.svg"} alt="logo" height={50} width={148} />
        </Logo>
        <Links>
          <NavLink $isActive={path === "/"}>
            <Link href={"/"} legacyBehavior>Home</Link>
          </NavLink>
          <NavLink $isActive={path === "/overview"}>
            <Link href={"/overview"} legacyBehavior>Overview</Link>
          </NavLink>
          <NavLink $isActive={false}>
            <Link href={"/#jobs"} legacyBehavior>Jobs</Link>
          </NavLink>
        </Links>
        <Auth>
          <Link href={"/login"} legacyBehavior>Login</Link>
          <Link href={"/register"} legacyBehavior>Register</Link>
        </Auth>
        <button className='nav-btn' onClick={() => setShowDropdown(!showDropdown)}>
          <Image src={showDropdown ? "/close-icon.svg" : "/menu.svg"} alt="logo" height={36} width={36} />
        </button>
      </Wrapper>
      {
        showDropdown ? (
          <Dropdown>
            <MLinks>
              <NavLink $isActive={path === "/"} onClick={() => { setShowDropdown(false) }}>
                <Link href={"/"} legacyBehavior>Home</Link>
              </NavLink>
              <NavLink $isActive={path === "/overview"} onClick={() => { setShowDropdown(false) }}>
                <Link href={"/overview"} legacyBehavior>Overview</Link>
              </NavLink>
              <NavLink $isActive={path === "/jobs"} onClick={() => { setShowDropdown(false) }}>
                <Link href={"/#jobs"} legacyBehavior>Jobs</Link>
              </NavLink>
            </MLinks>
            <MAuth>
              <Link href={"/login"} legacyBehavior>Login</Link>
              <Link href={"/register"} legacyBehavior>Register</Link>
            </MAuth>
          </Dropdown>
        ) : null
      }
    </Container>
  )
}

export default Nav