"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Auth, Container, Dropdown, Links, Logo, MAuth, MLinks, NavButton, Wrapper } from './style'
import { useRouter, usePathname } from 'next/navigation'
import { SubNavButton, SubNavWrapper } from '../sidebar/style'
import { ArrowDownIcon, BookIcon, DocumentIcon, HomeIcon, LogoutIcon, UserIcon, UsersIcon, WalletIcon } from '../svg-icons'
import { getUser, useSelector } from '@/lib/redux'

const Nav = () => {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const user = useSelector(getUser);
  const handleLogout = () => {
    localStorage.clear();
    router.replace("/login");
  }

  // Track if the page is scrolled then the styling of the nav is updated
  const handleScroll = (e: Event) => {
    if((document.body.scrollTop > 100) || document.documentElement.scrollTop > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }
  const handleRouting = (route: string) => {
    router.push(route);
    setShowDropdown(false);
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
          <Image src={"/logo.svg"} alt="logo" height={36} width={118} />
        </Logo>
        <button className='nav-btn' onClick={() => setShowDropdown(!showDropdown)}>
          <Image src={showDropdown ? "/close-icon.svg" : "/menu.svg"} alt="logo" height={34} width={34} />
        </button>
      </Wrapper>
      {
        showDropdown ? (
          <Dropdown>
            <MLinks>
              <NavButton $isActive={pathname === "/dashboard"} onClick={() => handleRouting("/dashboard")}>
                  <div>
                    <HomeIcon />
                    <span>Dashboard</span>
                  </div>
              </NavButton>
              {  user.accountType === "user" && <NavButton onClick={() => setShow(!show)} $isActive={pathname.includes("/dashboard/tasks")}>
                  <div>
                    <DocumentIcon />
                    <span>Tasks</span>
                  </div>
                  <ArrowDownIcon />
                </NavButton>
              }
              {
                show ? (
                  <SubNavWrapper>
                    <SubNavButton onClick={() => handleRouting("/dashboard/tasks/moderators")}>
                      <div>
                        <Image src="/mapper.svg" alt="" height={50} width={24}/>
                      </div>
                      <span>Moderators</span>
                    </SubNavButton>
                    {/* <SubNavButton onClick={() => handleRouting("/dashboard/tasks/collab-managers")}>
                      <div>
                        <Image src="/mapper.svg" alt="" height={50} width={24}/>
                      </div>
                      <span>Collab Managers</span>
                    </SubNavButton> */}
                    <SubNavButton onClick={() => handleRouting("/dashboard/tasks/twitter-raiders")}>
                      <div>
                        <Image src="/mapper.svg" alt="" height={50} width={24}/>
                      </div>
                      <span>Twitter Raiders</span>
                    </SubNavButton>
                    <SubNavButton  onClick={() => handleRouting("/dashboard/tasks/chat-engagers")}>
                      <div>
                        <Image src="/mapper.svg" alt="" height={50} width={24}/>
                      </div>
                      <span>Chat Engagers</span>
                    </SubNavButton>
                  </SubNavWrapper>
                ) : null
              }
              {user.accountType === "client" && 
                <NavButton $isActive={pathname.includes("/dashboard/tasks/client")} onClick={() => handleRouting("/dashboard/tasks/client")}>
                  <div>
                    <DocumentIcon />
                    <span>Tasks</span>
                  </div>
                </NavButton>
              }
              <NavButton $isActive={pathname === ("/dashboard/wallet")} onClick={() => handleRouting("/dashboard/wallet")}>
                  <div>
                    <WalletIcon />
                    <span>Wallet</span>
                  </div>
              </NavButton>
              <NavButton $isActive={pathname === "/dashboard/profile"}  onClick={() => handleRouting("/dashboard/profile")}>
                  <div>
                    <UserIcon />
                    <span>Profile</span>
                  </div>
              </NavButton>
              { user.accountType === "user" && <NavButton $isActive={pathname === "/dashboard/academy"}  onClick={() => handleRouting("/dashboard/academy")}>
                  <div>
                    <BookIcon />
                    <span>Academy</span>
                  </div>
              </NavButton>
              }
              { user.accountType === "user" && <NavButton $isActive={pathname === "/dashboard/referral"}  onClick={() => handleRouting("/dashboard/referral")}>
                  <div>
                    <UsersIcon />
                    <span>Referral</span>
                  </div>
              </NavButton>
              }
            </MLinks>
            <MAuth>
              <NavButton onClick={handleLogout}>
                  <div>
                    <LogoutIcon />
                    <span>Logout</span>
                  </div>
              </NavButton>
            </MAuth>
          </Dropdown>
        ) : null
      }
    </Container>
  )
}

export default Nav