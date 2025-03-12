"use client";

import React, { useEffect, useRef } from "react";
import { formatLink } from "@/lib/utils";
import Link from "next/link";
import TaskBox from "@/app/(routes)/dashboard/_components/taskbox/TaskBox";
import { Wrapper } from "@/app/styles/academy.style";
import { LeftColumn, TaskWrapper, RightColumn, TaskSub, Details, BoldP, Instructions, StartButton } from "@/app/styles/task-details.styles";
import { useRaiderTaskFeature } from "@/lib/hooks/raider/task";

interface IProps {
    id: string
}

const TaskDetails: React.FC<IProps> = ({ id }) => {
    const isLoaded = useRef(false);

    const { currentTask, handleStartTask, getRaiderTask } = useRaiderTaskFeature()

    useEffect(() => {
        if (isLoaded.current) return;
        getRaiderTask({ task_id: id });
        isLoaded.current = true;
    }, []);
    

    return (
        <Wrapper>
            <LeftColumn>
                <TaskWrapper style={{ marginTop: "60px" }}>
                    <TaskBox heading={"Total Tasks"} tasksNub={currentTask?.total_raids ?? 0} />
                    <TaskBox heading={"Available Tasks"} tasksNub={currentTask?.available_raids ?? 0} />
                    <TaskBox heading={"Completed Tasks"} tasksNub={currentTask?.completed_raids ?? 0} />
                </TaskWrapper>
            </LeftColumn>

            <RightColumn style={{ marginTop: "10px" }}>
                <TaskSub>Raiders</TaskSub>
                <Details>
                    <div>
                        <p>Task created at:</p>
                        <BoldP>{currentTask?.started_at && (new Date(currentTask?.started_at)).toUTCString()}</BoldP>
                    </div>

                    <div>
                        <p>Task to end before:</p>
                        <BoldP>{currentTask?.ended_at && (new Date(currentTask?.ended_at)).toUTCString()}</BoldP>
                    </div>

                    <div>
                        <p>Raid Link</p>
                        <Link href={formatLink(currentTask?.raid_information?.raid_link ?? "")} legacyBehavior>
                            <a style={{ color: "#f1c618", fontWeight: 500 }} target="_blank" href={formatLink(currentTask?.raid_information?.raid_link ?? "")} title={currentTask?.raid_information?.raid_link}>{(currentTask?.raid_information?.raid_link ?? "").substring(0, 20)}</a>
                        </Link>
                    </div>

                    <div>
                        <p>Action</p>
                        <BoldP>
                            {currentTask?.raid_information?.action }
                        </BoldP>
                    </div>
                </Details>
                {
                    currentTask?.raid_information.campaign_caption && (
                        <Instructions>
                                <h4>Caption</h4>
                                <div className="instruction-grid">
                                    <p>{currentTask?.raid_information?.campaign_caption}</p>
                                </div>
                        </Instructions>
                    )
                }
                {/* <div>
                    <h4>Select Service</h4>
                    <TextInput style={{ marginTop: "10px" }}>
                        <select
                            value={currentService}
                            onChange={(event) =>
                                setCurrentService(event.target.value)
                            }
                        >
                            <option value={""}>Select a service</option>
                            {
                                services.filter((s: any) => (s.accountType === "raider") && (s?.subscriptionStatus === "ACTIVE")).map((raid: any, i: number) => (
                                    <option key={i} value={raid.id}>@{getAvailableHandle(raid.handles)}</option>
                                ))
                            }
                        </select>
                    </TextInput>
                </div> */}
                {(
                    <Instructions>
                        <h4>Task Instruction</h4>
                        <div className="instruction-grid">
                            <p>1.</p>
                            <p>
                                Join the Client&amp;s Discord Community using the
                                provided invite link.
                            </p>
                        </div>

                        <div className="instruction-grid">
                            <p>2.</p>
                            <p>
                                Engage in conversations and contribute at least
                                25 meaningful messages within the allocated
                                time.
                            </p>
                        </div>

                        <div className="instruction-grid">
                            <p>3.</p>
                            <p>
                                Ensure that your messages are relevant,
                                respectful, and add value to the community
                                discussions.
                            </p>
                        </div>

                        <div className="instruction-grid">
                            <p>4.</p>
                            <p>
                                Be active and responsive during the task
                                duration to encourage interactions and build
                                connections.
                            </p>
                        </div>

                        <div className="instruction-grid">
                            <p>5.</p>
                            <p>
                                Take screenshots as proof of completing the
                                tasks.
                            </p>
                        </div>
                    </Instructions>
                )}
                <StartButton onClick={() => handleStartTask({ task_id: id })}>
                    Start Task
                </StartButton>
            </RightColumn>
        </Wrapper>
    );
};

export default TaskDetails;
