"use client"
import HeadingCard from '@/app/(routes)/dashboard/_components/heading-card/heading-card'
import { Container } from '@/app/styles/dashboard.style'
import Image from 'next/image'
import React, { useState } from 'react'
import Moderators from './moderators'
import CollabManagers from './collab-managers'
import TwitterRaiders from './twitter-raiders'
import ChatEngagers from './chat-engagers'
import { Tab, TabContainer, Wrapper } from '@/app/styles/academy.style'

const Academy = () => { 
  const [currentTab, setCurrentTab] = useState(1)
  return (
    <Container>
      <HeadingCard heading={"Academy"} />
      <Wrapper>
        <TabContainer>
            <Tab $isActive={currentTab === 1} onClick={() => setCurrentTab(1)}>Moderators</Tab>
            <Tab $isActive={currentTab === 2} onClick={() => setCurrentTab(2)}>Collab Managers</Tab>
            <Tab $isActive={currentTab === 3} onClick={() => setCurrentTab(3)}>Twitter Raiders</Tab>
            <Tab $isActive={currentTab === 4} onClick={() => setCurrentTab(4)}>Chat Engagers</Tab>
        </TabContainer>
        { currentTab === 1 ? <Moderators /> : null }
        { currentTab === 2 ? <CollabManagers /> : null }
        { currentTab === 3 ? <TwitterRaiders /> : null }
        { currentTab === 4 ? <ChatEngagers /> : null }
      </Wrapper>
    </Container>
  )
}

export default Academy;
