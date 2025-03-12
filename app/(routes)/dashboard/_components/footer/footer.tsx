"use client"
import React from 'react'
import { Bottom, Container, Logo, Section, SectionWrapper, Top, Wrapper } from './style'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Top>
          <Logo>
            <Image src={"/logo.svg"} alt="logo" height={50} width={148} />
          </Logo>
          <SectionWrapper>
            <Section>
              <h3>Quick Link</h3>
              <ul>
                <li><Link href={"/"} legacyBehavior>Home</Link></li>
                <li><Link href={"/"} legacyBehavior>Academy</Link></li>
                <li><Link href={"/"} legacyBehavior>Referral Program</Link></li>
                <li><Link href={"/"} legacyBehavior>Service</Link></li>
              </ul>
            </Section>
            <Section>
              <h3>Legal</h3>
              <ul>
                <li><Link href={"/"} legacyBehavior>Disclaimer</Link></li>
                <li><Link href={"/"} legacyBehavior>Term of Service</Link></li>
                <li><Link href={"/"} legacyBehavior>Privacy Policy</Link></li>
              </ul>
            </Section>
            <Section>
              <h3>Community</h3>
              <ul>
                <li><Link href={"/"} legacyBehavior>Discord</Link></li>
                <li><Link href={"/"} legacyBehavior>Twitter</Link></li>
              </ul>
            </Section>
          </SectionWrapper>
        </Top>
        <Bottom>
          <p>&copy;Copyright BM DAO 2024</p>
        </Bottom>
      </Wrapper>
    </Container>
  )
}

export default Footer