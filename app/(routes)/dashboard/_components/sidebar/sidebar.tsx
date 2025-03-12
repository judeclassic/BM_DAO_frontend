"use client"
import React, { useState } from 'react'
import { Container, LogoWrapper, NavButton, SubNavButton, SubNavWrapper } from './style'
import Image from 'next/image'
import { ArrowDownIcon, BookIcon, DocumentIcon, HomeIcon, UserIcon, WalletIcon } from '../svg-icons'
import { UsersIcon } from '../svg-icons'
import { LogoutIcon } from '../svg-icons'
import { usePathname, useRouter } from 'next/navigation'
import { AccountType } from '@/lib/types/user/user.interface'
import { useUserStore } from '@/lib/store/user'

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUserStore()
  const handleLogout = () => {
    localStorage.clear();
    router.replace("/auth/login");
  }
  return (
    <Container>
        <LogoWrapper>
            <Image src={"/logo.svg"} alt="logo" height={50} width={148} />
        </LogoWrapper>
        <NavButton $isActive={pathname === "/dashboard"} onClick={() => router.push("/dashboard")}>
            <div>
              <HomeIcon />
              <span>Dashboard</span>
            </div>
        </NavButton>
        {user?.account_type === AccountType.USER && <NavButton onClick={() => setShow(!show)} $isActive={pathname.includes("/dashboard/tasks")}>
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
              <SubNavButton onClick={() => router.push("/dashboard/tasks/moderators")}>
                <div>
                  <Image src="/mapper.svg" alt="" height={50} width={24}/>
                </div>
                <span>Moderators</span>
              </SubNavButton>
              {/* <SubNavButton onClick={() => router.push("/dashboard/tasks/collab-managers")}>
                <div>
                  <Image src="/mapper.svg" alt="" height={50} width={24}/>
                </div>
                <span>Collab Managers</span>
              </SubNavButton> */}
              <SubNavButton onClick={() => router.push("/dashboard/tasks/raiders")}>
                <div>
                  <Image src="/mapper.svg" alt="" height={50} width={24}/>
                </div>
                <span>Raiders</span>
              </SubNavButton>
              {/* <SubNavButton  onClick={() => router.push("/dashboard/tasks/chat-engagers")}>
                <div>
                  <Image src="/mapper.svg" alt="" height={50} width={24}/>
                </div>
                <span>Chat Engagers</span>
              </SubNavButton> */}
            </SubNavWrapper>
          ) : null
        }
        {user?.account_type === AccountType.CLIENT && 
          <NavButton $isActive={pathname.includes("/dashboard/tasks/client")} onClick={() => router.push("/dashboard/tasks/client")}>
            <div>
              <DocumentIcon />
              <span>Tasks</span>
            </div>
          </NavButton>
        }
        <NavButton $isActive={pathname === ("/dashboard/wallet")} onClick={() => router.push("/dashboard/wallet")}>
            <div>
              <WalletIcon />
              <span>Wallet</span>
            </div>
        </NavButton>
        <NavButton $isActive={pathname === "/dashboard/profile"}  onClick={() => router.push("/dashboard/profile")}>
            <div>
              <UserIcon />
              <span>Profile</span>
            </div>
        </NavButton>
        { user?.account_type === AccountType.USER && <NavButton $isActive={pathname === "/dashboard/academy"}  onClick={() => router.push("/dashboard/academy")}>
            <div>
              <BookIcon />
              <span>Academy</span>
            </div>
        </NavButton>
        }
        { user?.account_type === AccountType.USER && <NavButton $isActive={pathname === "/dashboard/referral"}  onClick={() => router.push("/dashboard/referral")}>
            <div>
              <UsersIcon />
              <span>Referral</span>
            </div>
        </NavButton>
        }
        <NavButton onClick={handleLogout}>
            <div>
              <LogoutIcon />
              <span>Logout</span>
            </div>
        </NavButton>
    </Container>
  )
}

export default Sidebar