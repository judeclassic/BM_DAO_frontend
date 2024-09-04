"use client";

import chart from "../../../../public/chart.svg";

import HeadingCard from "@/app/components/heading-card/heading-card";
import {
    ArrowDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    DepositIcon,
    WithdrawIcon,
} from "@/app/components/svg-icons";
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
import { getUser, setUser, useDispatch, useSelector } from "@/lib/redux";
import { getUserTransactionHistory } from "@/app/api/wallet";
import { getUserProfile } from "@/app/api/auth";
import { Pagination } from "@/app/styles/client-moderators.style";
import { generatePages } from "@/lib/utils";
import DepositeTask from "./deposit";
import WithdrawTask from "./withraw";
import TransferTask from "./transfer";
import { bmdaoTokenBalance } from "@/app/api/service";

const Wallet = () => {
    const [changeCurrency, setChangeCurrency] = useState<boolean>(false);
    const [history, setHistory] = useState<any>([]);
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [pages, setPages] = useState<string[]>([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const limit = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [refetch, setRefetch] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [showDeposit, setShowDeposit] = useState(false);
    const [showTransfer, setShowTransfer] = useState(false);
    const [userProfile, setUserProfile] = useState<any>('')
    const [tokenBalance, setTokenBalance] = useState<any>('')
    const handleChangePage = (page: number) => {
        if((page !== currentPage) && (page > 0) && (page <= numberOfPages)) {
            setCurrentPage(page);
        }
    }

    const fetchHistory = () => {
        getUserTransactionHistory(limit, currentPage)
        .then((res) => {
          setHistory(res.data.data.transactions)
          setPages(generatePages(res.data.data.totalTransactions, limit, currentPage));
          setNumberOfPages(Math.ceil(res.data.data.totalTransactions/limit));
        })
        .catch((e) => {
          console.log(e)
        })
    }

    const userProfilee = () => {
        getUserProfile()
        .then((res) => {
            setUserProfile(res.data.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    const fetchbmdaoTokenbalance = () => {
        bmdaoTokenBalance()
        .then((res) => {
            setTokenBalance(res.data.data.balance)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    
    useEffect(() => {
      fetchHistory();
      userProfilee()
      fetchbmdaoTokenbalance()
    }, [])
    
    return (
        <Container>
            <HeadingCard heading={"Wallet"} />
            <BalanceContainer>
                <MobileBalanceCard>
                    <div className="top">
                        <div>
                            <p>Wallet Balance</p>
                            <h1>${Number(user?.wallet?.balance?.totalBalance ?? "0").toFixed(2)}</h1>
                        </div>
                        <button>
                            <span>BMT</span>
                            <ArrowDownIcon />
                        </button>
                    </div>
                    <p>BMT Value: {(Number(user?.wallet?.balance?.totalBalance ?? "0") * 1000).toFixed(2)}</p>
                </MobileBalanceCard>

                <BalanceCards>
                    <BalanceCard>
                        <p>USD</p>
                        <div>
                            <p>Available Balance</p>
                            <Amount>${Number(user?.wallet?.balance?.totalBalance ?? "0").toFixed(2)}</Amount>
                        </div>
                    </BalanceCard>

                    <BalanceCard>
                        <p>BMT</p>
                        <div>
                            <p>Available Balance</p>
                            <Amount>{(Number(user?.wallet?.balance?.totalBalance ?? "0") * 1000).toFixed(2)} BMT</Amount>
                        </div>
                    </BalanceCard>
                    <TotalCard>
                        <div>
                            <div className="content">
                                <Image src={chart} alt="chart icon" />
                                Cryto Balance
                            </div>

                            <div className="price">{tokenBalance} BMT</div>
                        </div>

                        <div className="stroke"></div>

                        <div>
                            <div className="content">
                                <Image src={chart} alt="chart icon" />
                                Web2 Balance
                            </div>

                            <div className="price">{(Number(user?.wallet?.balance?.totalBalance ?? "0") * 1000).toFixed(2)} BMT</div>
                        </div>
                    </TotalCard>
                </BalanceCards>

                <Buttons>
                    <button   onClick={() => setShowWithdraw(true)}>
                        <WithdrawIcon /> Withdraw
                        
                    </button>
                    <button  onClick={() => setShowDeposit(true)}>
                        <DepositIcon /> Deposit
                    </button>
                    <button  onClick={() => setShowTransfer(true)}>
                        <DepositIcon /> Transfer
                    </button>
                </Buttons>
                <p>{userProfile?.wallet?.wallet?.address}</p>

                <WalletMobileTotalCard>
                    <div>
                        <div className="content">
                            <Image src={chart} alt="chart icon" />
                            Cryto Balance
                        </div>

                        <div className="price">{tokenBalance} BMT</div>
                    </div>

                    <div className="stroke"></div>

                    <div>
                        <div className="content">
                            <Image src={chart} alt="chart icon" />
                            Web2 Balance
                        </div>

                        <div className="price">{(Number(user?.wallet?.balance?.totalBalance ?? "0") * 1000).toFixed(2)} BMT</div>
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
                <Pagination>
                    <div onClick={() => handleChangePage(currentPage - 1)} style={{ cursor: "pointer" }}> 
                        <ArrowLeftIcon />
                    </div>
                    <div>
                        {
                            pages.map((val, i) => {
                                if(Number(val) === currentPage) {
                                    return <p className="active" onClick={() => handleChangePage(Number(val))} style={{ cursor: "pointer" }}>{val}</p> 
                                }
                                if(val === "...") {
                                    return <p style={{ cursor: "not-allowed" }}>...</p>
                                }
                                return <p onClick={() => handleChangePage(Number(val))} style={{ cursor: "pointer" }}>{val}</p> 
                            })
                        }
                    </div>
                    <div onClick={() => handleChangePage(currentPage + 1)} style={{ cursor: "pointer" }}>
                        <ArrowRightIcon />
                    </div>
                </Pagination>
            </History>
            {
                showWithdraw && <WithdrawTask setShowModal={setShowWithdraw} setRefetch={setRefetch} refetch={refetch}/>
            }
            {
                showDeposit && <DepositeTask setShowModal={setShowDeposit} setRefetch={setRefetch} refetch={refetch}/>
                    
            }
            {
                showTransfer && <TransferTask setShowModal={setShowTransfer} setRefetch={setRefetch} refetch={refetch}/>
                    
            }
        </Container>
    );
};

export default Wallet;
