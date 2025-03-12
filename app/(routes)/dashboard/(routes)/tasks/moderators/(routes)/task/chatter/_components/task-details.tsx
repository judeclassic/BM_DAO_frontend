"use client";

import React, { ChangeEvent, DragEvent, useEffect, useState } from "react";
import {
    Wrapper,
    LeftColumn,
    RightColumn,
    TaskSub,
    Details,
    BoldP,
    Instructions,
    StartButton,
    TaskImageWrapper,
    TextInput,
    TaskWrapper,
    Tasks,
    Task,
} from "../../../../../../../../../styles/task-details.styles";
import TaskBox from "../../../../../../../_components/taskbox/TaskBox";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { formatLink } from "@/lib/utils";
import Link from "next/link";

interface IProps {
    id: string
}

const TaskDetails: React.FC<IProps> = ({ id }) => {

    return (
        <Wrapper>
        {/* <LeftColumn>
            <TaskImageWrapper style={{ marginTop: "60px", height: "100%", width: "90%" }}>
                <img style={{height: "100%", width: "100%"}} src={imgTask?.[currentIndex]} alt={`Image ${currentIndex}`} />
            </TaskImageWrapper>
            <div style={{ display: "flex", justifyContent: "space-between", gap:"10px" }}>
                    <StartButton onClick={prevImage} disabled={currentIndex === 0}>Prev</StartButton>
                    <StartButton onClick={nextImage} disabled={currentIndex === imgTask?.length - 1}>Next</StartButton>
            </div>
        </LeftColumn> */}

        {/* <RightColumn style={{ marginTop: "10px" }}>
            <TaskSub>Chatter</TaskSub>
             <Details>

                <div>
                    <p>Minimum Message Count:</p>
                    <BoldP>25</BoldP>
                </div>

                <div>
                    <p>Task Reward:</p>
                    {task?.map((chat: any) => (
                        <BoldP>{chat.taskId.chatInformation.compaignCaption}</BoldP>
                    ))}
                    <BoldP>0.1</BoldP>
                </div>

                <div>
                    <p>Social Media:</p>
                    <BoldP>{task?.[currentTaskIndex]?.taskId?.chatInformation?.compaignCaption}</BoldP>
                </div>
                <div>
                    <p>Social Media Link:</p>
                    <BoldP>{task?.[currentTaskIndex]?.taskId?.chatInformation?.postLink}</BoldP>
                </div>
                <div>
                    <p>Number of uploads:</p>
                    <BoldP>{task?.[currentTaskIndex]?.proofs?.length}</BoldP>
                </div>
                <div>
                    <p>Client’s Community Link:</p>
                    <BoldP>www.BMDAO.com</BoldP>
                </div>
            </Details>
            {
                task?.raidInformation?.campaignCaption && (
                    <Instructions>
                            <h4>Caption</h4>
                            <div className="instruction-grid">
                                <p>{task?.raidInformation?.campaignCaption}</p>
                            </div>
                    </Instructions>
                )
            }
            {startTask || (
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <StartButton onClick={handleRejectTask}>Reject</StartButton>
                    <StartButton onClick={handleMarkAsComplete}>Accept</StartButton>
            </div>
        </RightColumn> */}
    </Wrapper>
    );
};

export default TaskDetails;
