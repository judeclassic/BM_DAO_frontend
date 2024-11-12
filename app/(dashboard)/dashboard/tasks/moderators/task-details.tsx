"use client";

import { getAllModeratorCompletedTask, getAllModeratorOngoingTask, getAllModeratorTask } from "@/app/api/moderator";
import { getAllRaidTask, getAllRaids } from "@/app/api/task";
import TaskBox from "@/app/components/taskbox/TaskBox";
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
import { getUser, useSelector } from "@/lib/redux";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChatTaskDetailsNew from "./chat-task-details";
import RaidTaskDetailsNew from "./raid-task-details";
import { CompletedTaskDetails } from "./completed-task-details";

const TaskDetailsNew = () => {
    const [tasks, setTasks] = useState<any>([]);
    const [raids, setRaids] = useState<any>([]);
    const [completedRaids, setCompletedRaids] = useState<any>([]);
    const [currentTask, setCurrentTask] = useState(2);
    const router = useRouter();
    const user = useSelector(getUser);

    const fetchTasks = () => {
        getAllModeratorTask(20, 1)
        .then((res) => {
            setTasks(res.data.data.tasks);
        })
        .catch((res) => {

        })
    }
    const fetchRaids = () => {
        getAllModeratorOngoingTask(20, 1)
        .then((res) => {
            setRaids(res.data.data.tasks);
        })
        .catch((res) => {
        })
    }
    const fetchCompletedRaids = () => {
        getAllModeratorCompletedTask(20, 1)
        .then((res) => {
            setCompletedRaids(res.data.data.tasks);
        })
        .catch((res) => {
        })
    }
    useEffect(() => {
      fetchRaids();
      fetchTasks();
      fetchCompletedRaids();
    }, [])
    
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

export default TaskDetailsNew;

