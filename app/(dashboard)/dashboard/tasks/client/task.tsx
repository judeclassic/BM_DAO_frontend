"use client";

import HeadingCard from "@/app/components/heading-card/heading-card";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    DocumentIcon,
} from "@/app/components/svg-icons";
import {
    History,
    HistoryCard,
    HistoryCardItem,
} from "@/app/styles/client-dashboard.style";
import {
    HistoryContainer,
    ModWrapper,
    Pagination,
    Tasks,
    TaskCard,
    ClientHistory,
} from "@/app/styles/client-moderators.style";
import { Container, StatsCard } from "@/app/styles/dashboard.style";
import React, { useEffect, useState } from "react";
import UploadTask from "./upload-task";
import { getAllClientRaiderTask } from "@/app/api/task";
import { generatePages } from "@/lib/utils";
import { getUser, useSelector } from "@/lib/redux";
import { getAllClientChatterTask, getAllTotalChatTaskByStatus, getAllTotalRaidTaskByStatus } from "@/app/api/service";

const ClientTasks = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [tasks, setTasks] = useState<any>([]);
    const [pages, setPages] = useState<string[]>([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const limit = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const user = useSelector(getUser);
    const [refetch, setRefetch] = useState(false);
    const [totalUploadRaid, setTotalUploadRaid] = useState(0);
    const [totalUploadChat, setTotalUploadChat] = useState(0);
    const [totalCompletedRaid, setTotalCompletedRaid] = useState(0);
    const [totalCompletedChat, setTotalCompletedChat] = useState(0);
    const fetchTasks = () => {
        getAllClientRaiderTask(limit, currentPage)
        .then((res) => {
            setTasks(res.data.data.tasks);
            setPages(generatePages(res.data.data.totalTasks, limit, currentPage))
            setNumberOfPages(Math.ceil(res.data.data.totalTasks/limit));

            setTotalUploadRaid(res.data.data.totalTasks)
        })
        .catch((res) => {

        })

        getAllClientChatterTask(0, 50)
        .then((res) => {
            setTotalUploadChat(res.data.data.totalTasks)
        })
        .catch((res) => {

        })

        getAllTotalChatTaskByStatus('APPROVED')
        .then((res) => {
            setTotalCompletedChat(res.data.data)
        })
        .catch((res) => {

        })

        getAllTotalRaidTaskByStatus(1, 2, 'APPROVED')
        .then((res) => {
            setTotalCompletedRaid(res.data.data.totalRaids)
        })
        .catch((res) => {

        })
    }
    const handleChangePage = (page: number) => {
        if((page !== currentPage) && (page > 0) && (page <= numberOfPages)) {
            setCurrentPage(page);
        }
    }
    useEffect(() => {
      fetchTasks();
    }, [currentPage, refetch])
    return (
        <>
            <Container>
                <HeadingCard heading={"Tasks"} sub={"Moderators"} />

                <ModWrapper>
                    <Tasks>
                        {/* <TaskCard>
                            <div className="top">
                                <h2>Moderator</h2>
                            </div>
                            <div className="bottom">
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Uploaded</p>
                                    </div>
                                    <h2>{user?.analytics?.moderators.totalUploaded}</h2>
                                </StatsCard>
                                <div className="divider"></div>
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Completed</p>
                                    </div>
                                    <h2>{user.analytics?.moderators.totalCompleted}</h2>
                                </StatsCard>
                            </div>
                        </TaskCard> */}

                        {/* <TaskCard>
                            <div className="top">
                                <h2>Collab Manager</h2>
                            </div>
                            <div className="bottom">
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Uploaded</p>
                                    </div>
                                    <h2>{user.analytics?.collabManagers.totalUploaded}</h2>
                                </StatsCard>
                                <div className="divider"></div>
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Completed</p>
                                    </div>
                                    <h2>{user.analytics?.collabManagers.totalCompleted}</h2>
                                </StatsCard>
                            </div>
                        </TaskCard> */}

                        <TaskCard>
                            <div className="top">
                                <h2>Twitter Raider</h2>
                            </div>
                            <div className="bottom">
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Uploaded</p>
                                    </div>
                                    {/* <h2>{user.analytics?.raiders.totalUploaded}</h2> */}
                                    <h2>{totalUploadRaid}</h2>
                                </StatsCard>
                                <div className="divider"></div>
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Completed</p>
                                    </div>
                                    {/* <h2>{user.analytics?.raiders.totalCompleted}</h2> */}
                                    <h2>{totalCompletedRaid}</h2>
                                </StatsCard>
                            </div>
                        </TaskCard>

                        <TaskCard>
                            <div className="top">
                                <h2>Chat Engagers</h2>
                            </div>
                            <div className="bottom">
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Uploaded</p>
                                    </div>
                                    {/* <h2>{user.analytics?.chatEngagers.totalUploaded}</h2> */}
                                    <h2>{totalUploadChat}</h2>
                                </StatsCard>
                                <div className="divider"></div>
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Completed</p>
                                    </div>
                                    {/* <h2>{user.analytics?.chatEngagers.totalCompleted}</h2> */}
                                    <h2>{totalCompletedChat}</h2>
                                </StatsCard>
                            </div>
                        </TaskCard>
                    </Tasks>
                    <HistoryContainer>
                        <ClientHistory>
                            <div className="first">
                                <h2>Task History</h2>
                                <button
                                    className="desktop"
                                    onClick={() => setShowModal(true)}
                                >
                                    Upload Task
                                </button>
                            </div>
                            <HistoryCard>
                                <HistoryCardItem>
                                    <p className="title">
                                        Action
                                    </p>
                                    <p className="date">Date</p>
                                    <p className="status">Raid Link</p>
                                    <p className="price">Raiders</p>
                                </HistoryCardItem>
                                {
                                    tasks.map((task: any, i: number) => (
                                        <HistoryCardItem key={i}>
                                            <p className="title">
                                                {task?.raidInformation?.action}
                                            </p>
                                            <p className="date">{(new Date(task?.createdAt)).toDateString()}</p>
                                            <p className="status">{`${task?.raidInformation?.raidLink.substring(0, 10)}${task?.raidInformation?.raidLink.length > 10 ? "..." : ""}` }</p>
                                            <p className="price">{task?.raidInformation?.amount}</p>
                                        </HistoryCardItem>
                                    ))
                                }
                            </HistoryCard>

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

                            <button
                                className="mobile"
                                onClick={() => setShowModal(true)}
                            >
                                Upload Task
                            </button>
                        </ClientHistory>
                    </HistoryContainer>
                </ModWrapper>
            </Container>
            {showModal && <UploadTask setShowModal={setShowModal} setRefetch={setRefetch} refetch={refetch} />}
        </>
    );
};

export default ClientTasks;
