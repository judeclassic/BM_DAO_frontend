"use client";

import { raiderAvailbleTaskForDay, raiderTaskByStatus } from "@/app/api/service";
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

const TaskDetailsNew = () => {
    const [tasks, setTasks] = useState<any>([]);
    const [PendingRaids, setPendingRaids] = useState<any>([]);
    const [completedRaids, setCompletedRaids] = useState<any>([]);
    const [currentTask, setCurrentTask] = useState(2);
    const router = useRouter();
    const user = useSelector(getUser);
    const [totalAvailbleTask, setTotalAvailbleTask] = useState<any>(0);
    const [totalPendingTask, setTotalPendingTask] = useState<any>(0);
    const [totalCompletedTask, setTotalCompletedTask] = useState<any>(0);

    const fetchAvailableTasks = () => {
        raiderAvailbleTaskForDay(1, 100)
        .then((res) => {
            setTasks(res.data.data.tasks);
            setTotalAvailbleTask(res.data.data.totalTasks)
        })
        .catch((res) => {

        })
    }
    const fetchPendingRaids = () => {
        raiderTaskByStatus(1, 1000, "STARTED")
        .then((res) => {
            setPendingRaids(res.data.data.raids);
            setTotalPendingTask(res.data.data.totalRaids)
            
        })
        .catch((res) => {

        })
    }
    const fetchCompletedRaids = () => {
        raiderTaskByStatus(1, 1000, "COMPLETED")
        .then((res) => {
            setCompletedRaids(res.data.data.raids);
            setTotalCompletedTask(res.data.data.totalRaids)
            
        })
        .catch((res) => {

        })
    }

    const getActionReward = (action: string) => {
        switch (action) {
            case "Comment on Post":
                return 0.05
            case "Create a Tweet":
                return 0.1
            case "Like Post":
                return 0.005
            case "Raid":
                return 0.15
            case "Follow Account":
                return 0.007
            case "Retweet Post":
                return 0.1
            default:
                return 0;
        }
    }
    useEffect(() => {
        fetchPendingRaids();
        fetchAvailableTasks();
        fetchCompletedRaids()
    }, [])
    
    return (
        <Wrapper>
            <LeftColumn>
                <TaskWrapper>
                    <TaskBox heading={"Available Tasks"} tasksNub={totalAvailbleTask ?? 0} />
                    <TaskBox heading={"Pending Tasks"} tasksNub={totalPendingTask ?? 0} />
                    <TaskBox heading={"Completed Tasks"} tasksNub={totalCompletedTask ?? 0} />
                </TaskWrapper>
            </LeftColumn>

            <RightColumn>
                <TaskNav>
                    <TaskNavItem isActive={currentTask === 1} onClick={() => setCurrentTask(1)}>Pending</TaskNavItem>
                    <TaskNavItem isActive={currentTask === 2} onClick={() => setCurrentTask(2)}>Available</TaskNavItem>
                    <TaskNavItem isActive={currentTask === 3} onClick={() => setCurrentTask(3)}>Completed</TaskNavItem>
                </TaskNav>

                <Tasks>
                {
                       currentTask === 1 && PendingRaids.map((raid: any) => (
                            <Task>
                                <div>
                                    <h3>{raid.taskId.raidInformation.action}</h3>
                                    <p className="task-text">
                                        <span>Task status: </span>{raid?.taskStatus}
                                    </p>
                                    <div className="reward">
                                        <p>
                                            <span>Task timeline: </span>{raid?.timeLine}
                                        </p>
                                    </div>
                                </div>
                                <div className="claim">
                                    <button onClick={() => router.push(`/dashboard/tasks/twitter-raiders/raid/${raid?.id}`)}>View</button>
                                </div>
                            </Task>
                        ))
                    }
                    {
                       currentTask === 2 && tasks.map((task: any) => (
                            <Task>
                                <div>
                                    <h3>{task?.raidInformation?.action} wale</h3>
                                    <p className="task-text">
                                       {task?.raidInformation?.campaignCaption}
                                    </p>
                                    <div>
                                        <p>
                                            <span>Raiders needed: </span>{task?.raidInformation?.amount}
                                        </p>
                                        <p>
                                            <span>Remaining slot: </span>{task?.availableRaids}
                                        </p>
                                    </div>
                                </div>
        
                                <div className="claim">
                                    <button onClick={() => router.push(`/dashboard/tasks/twitter-raiders/${task?.id}`)} style={{ marginBottom: "5px" }}>Claim</button>
                                    <p>Reward: <span style={{ fontWeight: "600" }}>${getActionReward(task?.raidInformation?.action)}</span></p>
                                </div>
                            </Task>
                        ))

                        } 
                        {   
                        currentTask === 3 && completedRaids.map((raid: any) => (
                            <Task>
                                <div>
                                    <h3>{raid.taskId.raidInformation.action}</h3>
                                    <p className="task-text">
                                        <span>Task status: </span>{raid?.taskStatus}
                                    </p>
                                    <div className="reward">
                                        <p>
                                            <span>Task timeline: </span>{raid?.timeLine}
                                        </p>
                                    </div>
                                </div>
                
                            </Task>
                        ))
                    }
                </Tasks>
            </RightColumn>
        </Wrapper>
    );
};

export default TaskDetailsNew;
