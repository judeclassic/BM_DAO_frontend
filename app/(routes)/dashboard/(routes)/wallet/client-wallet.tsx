"use client";

import chart from "../../../../public/chart.svg";

import HeadingCard from "@/app/(routes)/dashboard/_components/heading-card/heading-card";
import {
    ArrowDownIcon,
    DepositIcon,
    WithdrawIcon,
} from "@/app/(routes)/dashboard/_components/svg-icons";
import {
    BalanceCard,
    BalanceContainer,
    Amount,
    BalanceCards,
    Buttons,
    History,
    HistoryDetails,
    TotalCard,
    MobileBalanceCard,
    MobileTotalCard,
    WalletMobileTotalCard,
} from "@/app/styles/client-wallet.style";
import { Container } from "@/app/styles/dashboard.style";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import dropdown_icon from "../../../../public/dropdown.svg";
import { useUserFeature } from "@/lib/hooks/user";

const Wallet = () => {
    const { user } = useUserFeature()

    const [changeCurrency, setChangeCurrency] = useState<boolean>(false);
    
    return (
        <Container>
            <HeadingCard heading={"Wallet"} />
            <BalanceContainer>
                <MobileBalanceCard>
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
                </MobileBalanceCard>

                <BalanceCards>
                    <BalanceCard>
                        <p>USD</p>
                        <div>
                            <p>Available Balance</p>
                            <Amount>${Number(user?.wallet?.balance?.total_balance).toFixed(2)}</Amount>
                        </div>
                    </BalanceCard>

                    <BalanceCard>
                        <p>BMT</p>
                        <div>
                            <p>Available Balance</p>
                            <Amount>{(Number(user?.wallet?.balance?.total_balance ?? "0") * 1000).toFixed(2)} BMT</Amount>
                        </div>
                    </BalanceCard>
                    <TotalCard>
                        <div>
                            <div className="content">
                                <Image src={chart} alt="chart icon" />
                                Total Income
                            </div>

                            <div className="price">$0</div>
                        </div>

                        <div className="stroke"></div>

                        <div>
                            <div className="content">
                                <Image src={chart} alt="chart icon" />
                                Total Withdrawn
                            </div>

                            <div className="price">$0</div>
                        </div>
                    </TotalCard>
                </BalanceCards>

                <Buttons>
                    <button>
                        <WithdrawIcon /> Withdraw
                    </button>
                    <button>
                        <DepositIcon /> Deposit
                    </button>
                </Buttons>


                <WalletMobileTotalCard>
                    <div>
                        <div className="content">
                            <Image src={chart} alt="chart icon" />
                            Total Income
                        </div>

                        <div className="price">$0</div>
                    </div>

                    <div className="stroke"></div>

                    <div>
                        <div className="content">
                            <Image src={chart} alt="chart icon" />
                            Total Withdrawn
                        </div>

                        <div className="price">$0</div>
                    </div>
                </WalletMobileTotalCard>
            </BalanceContainer>

            <History>
                <div>
                    <h3>Transaction History</h3>
                    <button onClick={() => setChangeCurrency(!changeCurrency)}>
                        <p>{changeCurrency ? "USD" : "BMT"}</p>
                        <Image src={dropdown_icon} alt="Dropdown" />
                    </button>
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
                    {/* {
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
                    } */}
                </HistoryDetails>
            </History>
        </Container>
    );
};

export default Wallet;
