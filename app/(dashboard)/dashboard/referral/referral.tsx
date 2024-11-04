"use client"
import { getUserProfileRefferal as getUserProfileReferral } from '@/app/api/auth'
import HeadingCard from '@/app/components/heading-card'
import { CopyIcon } from '@/app/components/svg-icons'
import { IUser } from '@/app/interface/user.interface'
import { Container, CopyContainer, StatsContainer } from '@/app/styles/dashboard.style'
import { Left, MRow, MTable, Right, TBody, THead, TRow, Table, Top, UserImage, Wrapper } from '@/app/styles/referral.style'
import { getUser, useSelector } from '@/lib/redux'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const user = useSelector(getUser);
    const [level, setLevel] = useState("1");
    const [referral, setReferral] = useState<any>(null);
    const [referrals, setReferrals] = useState<IUser[]>([])
    const handleLinkCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        toast.success("Referral Link copied to clipboard", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    const fetchReferral = () => {
        getUserProfileReferral(level)
        .then((res) => {
          console.log(res.data.data);
          const data = res.data.data;
          setReferrals(data.referrals);
          setReferral(data.referral)
        })
        .catch((e) => {
          console.log(e)
        })
      }
    useEffect(() => {
      fetchReferral();
    }, [level])
  return (
    <Container>
      <HeadingCard heading={"Referral"} />
      <Wrapper>
        <Left>
            <Top>
                <h2>Referrals</h2>
                <select value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                    <option value="3">Level 3</option>
                </select>
            </Top>
            <Table>
                <THead>
                    <p>Referral</p>
                    <p>Level</p>
                    <p>Earnings</p>
                </THead>
                <TBody>
                    {referrals.map((referral, i) => (
                        <TRow key={i}>
                            <p>
                                <UserImage>
                                    <Image src={"/user-1.png"} alt="user"  objectFit="cover" objectPosition="center" layout="fill" />
                                </UserImage>
                                <span>{referral.name}</span>
                            </p>
                            <p>Level {level}</p>
                            <p>${referral.referral.analytics.totalEarned}</p>
                        </TRow>
                    ))}
  
                </TBody>
            </Table>
            <MTable>
                {
                    referrals.map((val: any, i: number) => (
                        <MRow key={i}>
                            <div>
                                <p>{val.name}</p>
                                <p>Level {level}</p>
                            </div>
                            <p>${val?.referral?.analytics?.totalEarned}</p>
                        </MRow>
                    ))
                }
            </MTable>
        </Left>
        <Right>
          <CopyContainer>
            <p className='label'>Share your referral link</p>
            <div>
              <p>{window?.location?.host}/register?code={user.referral?.myReferralCode ?? ""}</p>
              <button onClick={() => handleLinkCopy(`${window?.location?.host}/register?code=${user.referral?.myReferralCode}` ?? "")}>
                  <CopyIcon />
                  <span>Copy</span>
              </button>
            </div>
          </CopyContainer>
          <h2>Referrals</h2>
          <StatsContainer>
            <div>
              <p>Referral Level</p>
              <p>Level {level}</p>
            </div>
            <div>
              <p>Total Referrals</p>
              <p>{referral?.analytics.totalAmount}</p>
            </div>
            <div>
              <p>Total Earnings</p>
              <p>${referral?.analytics.totalEarned} ({Number(referral?.analytics.totalEarned ?? "0") * 1000 } BMT)</p>
            </div>
          </StatsContainer>
          <h2>How Referral works</h2>
          <p>Each level of the referral program will offer different reward percentages for referral earnings. When a new member signs up using the referral link or code, they will be associated with the referring member and placed in the corresponding level of hte referral program.</p>
          <ul>
            <li>Level 1: Earning 20% of the first subscription fee generated by direct referrals.</li>
            <li>Level 2: Earning 10% of the first subscription fee generated by direct referrals.</li>
            <li>Level 3: Earning 10% of the first subscription fee generated by direct referrals.</li>
          </ul>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Dashboard;