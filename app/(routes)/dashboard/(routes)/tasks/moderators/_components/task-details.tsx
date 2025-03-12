"use client";

import {
    LeftColumn,
    RightColumn,
    Task,
    TaskNav,
    TaskNavItem,
    TaskWrapper,
    Tasks,
    Wrapper,
} from "@/app/styles/task-details.styles";
import React, { useState } from "react";
import ChatTaskDetailsNew from "./chat-task-details";
import RaidTaskDetailsNew from "./raid-task-details";
import { CompletedTaskDetails } from "./completed-task-details";

const ModeratorTaskDetails = () => {
    const [currentTask, setCurrentTask] = useState(2);
    
    return (
        <Wrapper>
            <LeftColumn>
                <TaskWrapper>
                    {/* <TaskBox heading={"Available Tasks"} tasksNub={user?.moderatorService?.analytics.availableTask ?? 0} />
                    <TaskBox heading={"Pending Tasks"} tasksNub={user?.moderatorService?.analytics.pendingTask ?? 0} />
                    <TaskBox heading={"Completed Tasks"} tasksNub={user?.moderatorService?.analytics.completedTask ?? 0} /> */}
                </TaskWrapper>
            </LeftColumn>

            <RightColumn>
                <TaskNav>
                    <TaskNavItem isActive={currentTask === 1} onClick={() => setCurrentTask(1)}>Chatters</TaskNavItem>
                    <TaskNavItem isActive={currentTask === 2} onClick={() => setCurrentTask(2)}>Raid</TaskNavItem>
                    {/* <TaskNavItem isActive={currentTask === 3} onClick={() => setCurrentTask(3)}>Completed</TaskNavItem> */}
                </TaskNav>
                {
                    currentTask === 1  && <ChatTaskDetailsNew/> 
                }
                {
                    currentTask === 2  && <RaidTaskDetailsNew/> 
                }
                {
                    currentTask === 3  && <CompletedTaskDetails/> 
                }
            </RightColumn>
        </Wrapper>
    );
};

export default ModeratorTaskDetails;

