"use client";

import TaskBox from "@/app/(routes)/dashboard/_components/taskbox/TaskBox";
import { LeftColumn, RightColumn, TaskNav, TaskNavItem, TaskWrapper, Wrapper } from "@/app/styles/task-details.styles";
import { useRaiderAccountStore } from "@/lib/store/account/raider/raider";
import React, { useState } from "react";
import AvailableTaskDetails from "./tasks/available_task";
import PendingTaskDetails from "./tasks/pending_task";
import CompletedTaskDetails from "./tasks/completed_task";

const TasksDetails = () => {
    const [ currentTask, setCurrentTask ] = useState<"pending" | "completed" | "available">("available");
    const { raiderAccount } = useRaiderAccountStore()
    
    return (
        <Wrapper>
            <LeftColumn>
                <TaskWrapper>
                    <TaskBox heading={"Available Tasks"} tasksNub={raiderAccount?.analytics?.available_task ?? 0} />
                    <TaskBox heading={"Pending Tasks"} tasksNub={raiderAccount?.analytics?.pending_task ?? 0} />
                    <TaskBox heading={"Completed Tasks"} tasksNub={raiderAccount?.analytics?.completed_task ?? 0} />
                </TaskWrapper>
            </LeftColumn>

            <RightColumn>
                <TaskNav>
                    <TaskNavItem isActive={currentTask === "available"} onClick={() => setCurrentTask('available')}>Available</TaskNavItem>
                    <TaskNavItem isActive={currentTask === "pending"} onClick={() => setCurrentTask('pending')}>Pending</TaskNavItem>
                    <TaskNavItem isActive={currentTask === "completed"} onClick={() => setCurrentTask('completed')}>Completed</TaskNavItem>
                </TaskNav>

                {currentTask === "available" && <AvailableTaskDetails/>}
                {currentTask === "pending" && <PendingTaskDetails/>}
                {currentTask === "completed" && <CompletedTaskDetails/>}
            </RightColumn>
        </Wrapper>
    );
};

export default TasksDetails;
