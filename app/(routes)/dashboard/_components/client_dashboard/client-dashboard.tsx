"use client";

import { getUserTransactionHistory } from "@/lib/api/wallet";
import HeadingCard from "@/app/(routes)/dashboard/_components/heading-card/heading-card";
import { ArrowDownIcon, DocumentIcon } from "@/app/(routes)/dashboard/_components/svg-icons";
import {
    ActivityCard,
    ActivitiesCard,
    ClientCardWrapper,
    ClientGridContainer,
    History,
    HistoryCard,
    HistoryCardItem,
    LeftContainer,
    ActivitiesCardRight,
    ActivitiesCardLeft,
    ClientTaskCard,
    ClientBalanceCard,
} from "@/app/styles/client-dashboard.style";
import { HistoryDetails } from "@/app/styles/client-wallet.style";

import {
    ActivityWrapper,
    BalanceCard,
    Container,
    StatsCard,
    TaskCard,
} from "@/app/styles/dashboard.style";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUserStore } from "@/lib/store/user";

const Dashboard = () => {
    const { user } = useUserStore();
    const [changeCurrency, setChangeCurrency] = useState<boolean>(false);
    const [history, setHistory] = useState<any>([]);
    const [totalUploadRaid, setTotalUploadRaid] = useState(0);
    const [totalUploadChat, setTotalUploadChat] = useState(0);
    const [totalCompletedRaid, setTotalCompletedRaid] = useState(0);
    const [totalCompletedChat, setTotalCompletedChat] = useState(0);

    const router = useRouter();

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
            <HeadingCard
                heading={`Hello, ${user?.personal.name} 👋`}
                sub={"Perform daily tasks and track your records!"}
                notShow={true}
            />
            <ClientGridContainer>
                <LeftContainer>
                    <ClientCardWrapper>
                        <ClientBalanceCard>
                            <div className="top">
                                <div>
                                <p>Wallet Balance</p>
                                <h1>${Number(user?.wallet?.balance?.total_balance).toFixed(2)}</h1>
                                </div>
                                <button>
                                <span>BMT</span>
                                <ArrowDownIcon />
                                </button>
                            </div>
                            <p>BMT Value: {(Number(user?.wallet?.balance?.total_balance ?? "0") * 1000).toFixed(2)}</p>
                        </ClientBalanceCard>
                        <ClientTaskCard>
                            <div className="top">
                                <h2>Tasks</h2>
                            </div>
                            <div className="bottom">
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Completed</p>
                                    </div>
                                    {/* <h2>{user.analytics?.totalCompleted ?? "0"}</h2> */}
                                    <h2>{totalCompletedChat + totalCompletedRaid}</h2>
                                </StatsCard>
                                <div className="divider"></div>
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Uploaded</p>
                                    </div>
                                    {/* <h2>{user.analytics?.totalUploaded ?? "0"}</h2> */}
                                    <h2>{totalUploadChat + totalUploadRaid}</h2>
                                </StatsCard>
                            </div>
                        </ClientTaskCard>
                    </ClientCardWrapper>

                    {/* <ActivitiesCardLeft>
                        <h2>Recent Activities</h2>
                        <ActivityWrapper>
                            <ActivityCard>
                                <div className="left">
                                    <div className="icon">
                                        <DocumentIcon />
                                    </div>
                                    <div>
                                        <h3>Twitter Raiding</h3>
                                        <p>Task</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <p>20 BMT</p>
                                    <p>26 June, 2023</p>
                                </div>
                            </ActivityCard>
                            <ActivityCard>
                                <div className="left">
                                    <div className="icon">
                                        <DocumentIcon />
                                    </div>
                                    <div>
                                        <h3>Twitter Raiding</h3>
                                        <p>Task</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <p>20 BMT</p>
                                    <p>26 June, 2023</p>
                                </div>
                            </ActivityCard>
                            <ActivityCard>
                                <div className="left">
                                    <div className="icon">
                                        <DocumentIcon />
                                    </div>
                                    <div>
                                        <h3>Twitter Raiding</h3>
                                        <p>Task</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <p>20 BMT</p>
                                    <p>26 June, 2023</p>
                                </div>
                            </ActivityCard>
                            <ActivityCard>
                                <div className="left">
                                    <div className="icon">
                                        <DocumentIcon />
                                    </div>
                                    <div>
                                        <h3>Twitter Raiding</h3>
                                        <p>Task</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <p>20 BMT</p>
                                    <p>26 June, 2023</p>
                                </div>
                            </ActivityCard>
                            <ActivityCard>
                                <div className="left">
                                    <div className="icon">
                                        <DocumentIcon />
                                    </div>
                                    <div>
                                        <h3>Twitter Raiding</h3>
                                        <p>Task</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <p>20 BMT</p>
                                    <p>26 June, 2023</p>
                                </div>
                            </ActivityCard>
                        </ActivityWrapper>
                    </ActivitiesCardLeft> */}

                    <History>
                        <div className="first">
                            <h2>Recent Transactions</h2>
                            <button className="dashboard" onClick={() => router.push("/dashboard/wallet")}>View All</button>
                        </div>
                        <HistoryDetails>
                            <div>
                                <p className="tittle">Type</p>
                                <p className="date">Date</p>
                                <p className="hidden-mobile">Status</p>
                                <p
                                    className={`bmt ${
                                        changeCurrency ? "none" : "block"
                                    } `}
                                >
                                    Amount in BMT
                                </p>
                                <p
                                    className={`usd ${
                                        changeCurrency ? "block" : "none"
                                    }`}
                                >
                                    Amount in USD
                                </p>
                            </div>
                            {
                                history.map((val: any, i: number) => (
                                    <div key={i}>
                                        <p className="tittle">{val?.transactionType}</p>
                                        <p className="date">{(new Date(val?.createdAt)).toDateString()}</p>
                                        <p className="hidden-mobile">{val?.transactionStatus}</p>
                                        <p
                                            className={`bmt ${
                                                changeCurrency ? "none" : "block"
                                            } `}
                                        >
                                            {Number(val?.amount) * 1000 } BMT
                                        </p>
                                        <p
                                            className={`usd ${
                                                changeCurrency ? "block" : "none"
                                            }`}
                                        >
                                            ${val?.amount}
                                        </p>
                                    </div>
                                ))
                            }
                        </HistoryDetails>
                    </History>
                </LeftContainer>

                <ActivitiesCardRight>
                    <h2>Recent Activities</h2>
                    <ActivityWrapper>
                        <ActivityCard>
                            <div className="left">
                                <div className="icon">
                                    <DocumentIcon />
                                </div>
                                <div>
                                    <h3>Twitter Raiding</h3>
                                    <p>Task</p>
                                </div>
                            </div>
                            <div className="right">
                                <p>20 BMT</p>
                                <p>26 June, 2023</p>
                            </div>
                        </ActivityCard>
                        <ActivityCard>
                            <div className="left">
                                <div className="icon">
                                    <DocumentIcon />
                                </div>
                                <div>
                                    <h3>Twitter Raiding</h3>
                                    <p>Task</p>
                                </div>
                            </div>
                            <div className="right">
                                <p>20 BMT</p>
                                <p>26 June, 2023</p>
                            </div>
                        </ActivityCard>
                        <ActivityCard>
                            <div className="left">
                                <div className="icon">
                                    <DocumentIcon />
                                </div>
                                <div>
                                    <h3>Twitter Raiding</h3>
                                    <p>Task</p>
                                </div>
                            </div>
                            <div className="right">
                                <p>20 BMT</p>
                                <p>26 June, 2023</p>
                            </div>
                        </ActivityCard>
                        <ActivityCard>
                            <div className="left">
                                <div className="icon">
                                    <DocumentIcon />
                                </div>
                                <div>
                                    <h3>Twitter Raiding</h3>
                                    <p>Task</p>
                                </div>
                            </div>
                            <div className="right">
                                <p>20 BMT</p>
                                <p>26 June, 2023</p>
                            </div>
                        </ActivityCard>
                        <ActivityCard>
                            <div className="left">
                                <div className="icon">
                                    <DocumentIcon />
                                </div>
                                <div>
                                    <h3>Twitter Raiding</h3>
                                    <p>Task</p>
                                </div>
                            </div>
                            <div className="right">
                                <p>20 BMT</p>
                                <p>26 June, 2023</p>
                            </div>
                        </ActivityCard>
                    </ActivityWrapper>
                </ActivitiesCardRight>
            </ClientGridContainer>
        </Container>
    );
};

export default Dashboard;
