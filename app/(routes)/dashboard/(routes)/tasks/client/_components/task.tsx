"use client";

import HeadingCard from "@/app/(routes)/dashboard/_components/heading-card/heading-card";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    DocumentIcon,
} from "@/app/(routes)/dashboard/_components/svg-icons";
import {
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
import React, { useEffect, useRef, useState } from "react";
import UploadTask from "./upload-task";
import { useClientRaiderTaskFeature } from "@/lib/hooks/client/raider-task";
import { useUserStore } from "@/lib/store/user";

const ClientTasks = () => {
    const limit = 10
    const [ showModal, setShowModal ] = useState(false);
    const { page, raiderTasks, getRaiderTasks } = useClientRaiderTaskFeature();
    const { user } = useUserStore()

    console.log("raiderTasks: ", raiderTasks)

    const getPages = () => {
        const array = []
        for (let i = 0; i < (raiderTasks?.total_raider_tasks??10 / 10); i++) {
            array.push(i);
        }
        return array;
    }
    return (
        <>
            <Container>
                <HeadingCard heading={"Tasks"} sub={"Moderators"} />
                <ModWrapper>
                    <Tasks>
                        <TaskCard>
                            <div className="top">
                                <h2>Raider</h2>
                            </div>
                            <div className="bottom">
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Uploaded</p>
                                    </div>
                                    <h2>{user?.setting.analytics.raiders.total_uploaded}</h2>
                                </StatsCard>
                                <div className="divider"></div>
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Completed</p>
                                    </div>
                                    <h2>{user?.setting.analytics.raiders.total_completed}</h2>
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
                                    <h2>{user?.setting.analytics.chat_engagers.total_uploaded}</h2>
                                </StatsCard>
                                <div className="divider"></div>
                                <StatsCard>
                                    <div>
                                        <DocumentIcon />
                                        <p>Completed</p>
                                    </div>
                                    <h2>{user?.setting.analytics.chat_engagers.total_completed}</h2>
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
                                    raiderTasks?.raider_tasks.map((task, index) => (
                                        <HistoryCardItem key={`${index} ${task.id}`}>
                                            <p className="title">
                                                {task?.raid_information?.action}
                                            </p>
                                            <p className="date">{(new Date(task?.created_at)).toDateString()}</p>
                                            <p className="status">{`${task?.raid_information?.raid_link.substring(0, 19)}${task?.raid_information?.raid_link.length > 19 ? "..." : ""}` }</p>
                                            <p className="price">{task?.raid_information?.amount}</p>
                                        </HistoryCardItem>
                                    ))
                                }
                            </HistoryCard>

                            <Pagination>
                                <div onClick={() => getRaiderTasks({ page: 1, limit })} style={{ cursor: "pointer" }}> 
                                    <ArrowLeftIcon />
                                </div>
                                <div>
                                    {
                                        getPages().map((val, i) => {
                                            if(Number(val) === page) {
                                                return <p key={`${val}-${i}`} className="active" onClick={() => getRaiderTasks({ page: val, limit })} style={{ cursor: "pointer" }}>{val}</p> 
                                            }
                                            // if(val === "...") {
                                            //     return <p style={{ cursor: "not-allowed" }}>...</p>
                                            // }
                                            return <p key={`${val}-${i}`} onClick={() => getRaiderTasks({ page: val, limit })} style={{ cursor: "pointer" }}>{val}</p> 
                                        })
                                    }
                                </div>
                                <div onClick={() => getRaiderTasks({ page: page + 1, limit })} style={{ cursor: "pointer" }}>
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
            {showModal && <UploadTask setShowModal={setShowModal}/>}
        </>
    );
};

export default ClientTasks;
