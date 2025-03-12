"use client"
import { getUserTransactionHistory } from '@/lib/api/wallet'
import HeadingCard from '@/app/(routes)/dashboard/_components/heading-card'
import { ArrowDownIcon, CopyIcon, DocumentIcon } from '@/app/(routes)/dashboard/_components/svg-icons'
import { ActivityCard, ActivityWrapper, BalanceCard, BottomWrapper, Card, CardWrapper, Container, CopyContainer, StatsCard, StatsContainer, StreakBox, StreakCard, TaskCard } from '@/app/styles/dashboard.style'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useUserStore } from '@/lib/store/user'

const UserDashboard = () => {
  const { user } = useUserStore();
  const handleLinkCopy = (content: string) => {
      navigator.clipboard.writeText(content);
      toast.success("Referral Link copied to clipboard", {
          position: toast.POSITION.TOP_RIGHT
      });
  }
  const [history, setHistory] = useState<any>([]);
  const fetchHistory = () => {
      getUserTransactionHistory(10, 1)
      .then((res) => {
        setHistory(res.data.data.transactions)
      })
      .catch((e) => {
        console.log(e)
      })
    }
  useEffect(() => {
    fetchHistory();
  }, [])
  return (
    <Container>
      <HeadingCard heading={`Hello, ${user?.personal.name ?? ""} 👋`} sub={"Perform daily tasks and track your records!"} notShow={true}/>
      <CardWrapper>
        <BalanceCard>
          <div className="top">
            <div>
              <p>Wallet Balance</p>
              <h1>${Number(user?.wallet?.balance?.total_balance ?? "0").toFixed(2)}</h1>
            </div>
            <button>
              <span>BMT</span>
              <ArrowDownIcon />
            </button>
          </div>
          <p>BMT Value: {(Number(user?.wallet?.balance?.total_balance ?? "0") * 1000).toFixed(2)}</p>
        </BalanceCard>
        <TaskCard>
          <div className='top'>
            <h2>Tasks</h2>
            <div>
              <span></span>
              <p>{user?.setting.analytics?.total_uploaded ?? 0} new available tasks</p>
            </div>
          </div>
          <div className="bottom">
            <StatsCard>
              <div>
                <DocumentIcon />
                <p>Completed</p>
              </div>
              <h2>{user?.setting.analytics?.total_completed ?? 0}</h2>
            </StatsCard>
            <div className='divider'></div>
            <StatsCard>
              <div>
                <DocumentIcon />
                <p>Pending</p>
              </div>
              <h2>{user?.setting.analytics?.total_pending ?? 0}</h2>
            </StatsCard>
          </div>
        </TaskCard>
        <StreakCard>
          <div className="left">
            <h2>Task Streak</h2>
            <div className="field">
              <StreakBox $isCompleted={true} />
              <p>Completed</p>
            </div>
            <div className="field">
              <StreakBox $isCompleted={false} />
              <p>Not Completed</p>
            </div>
          </div>
          <div className="right">
            <div>
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={false} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={false} />
              <StreakBox $isCompleted={false} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={false} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={false} />
              <StreakBox $isCompleted={false} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={false} />
              <StreakBox $isCompleted={false} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={false} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={true} />
              <StreakBox $isCompleted={false} />
              <StreakBox $isCompleted={false} />
              <StreakBox $isCompleted={true} />
            </div>
          </div>
        </StreakCard>
      </CardWrapper>
      <BottomWrapper>
        <Card>
          <h2>Recent Transactions</h2>
          <ActivityWrapper>
            {
              history.map((val: any, i: number) => (
                <ActivityCard>
                  <div className="left">
                    <div className="icon">
                      <DocumentIcon />
                    </div>
                    <div>
                      <h3>{val?.transactionType}</h3>
                      <p>{val?.transactionStatus}</p>
                    </div>
                  </div>
                  <div className="right">
                    <p style={{ textAlign: "right", width: "100%"}}>{(new Date(val?.createdAt)).toDateString()}</p>
                    <p style={{ textAlign: "right", width: "100%"}}>${Number(val?.amount)}</p>
                  </div>
                </ActivityCard>
              ))
            }
          </ActivityWrapper>
        </Card>
        <Card>
          <h2>Referrals</h2>
          <CopyContainer>
            <p className='label'>Share your referral link</p>
            <div>
              <p>{window?.location?.host}/register?code={user?.peripheral.referral?.my_referral_code ?? ""}</p>
              <button onClick={() => handleLinkCopy(`${window?.location?.host}/register?code=${user?.peripheral.referral?.my_referral_code}` ?? "")}>
                  <CopyIcon />
                  <span>Copy</span>
              </button>
            </div>
          </CopyContainer>
          <StatsContainer>
            <h2>Your Rewards</h2>
            <div>
              <p>Total Referrals</p>
              <p>{(user as any)?.referal?.analytics.totalAmount}</p>
            </div>
            <div>
              <p>Total Earnings</p>
              <p>${(user as any)?.referal?.analytics.totalEarned} ({Number((user as any)?.referal?.analytics.totalEarned ?? "0") * 1000 } BMT)</p>
            </div>
          </StatsContainer>
        </Card>
      </BottomWrapper>
    </Container>
  )
}

export default UserDashboard;
