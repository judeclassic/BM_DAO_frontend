"use client";

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
    const [raids, setRaids] = useState<any>([]);
    const [currentTask, setCurrentTask] = useState(2);
    const router = useRouter();
    const user = useSelector(getUser);

    const fetchTasks = () => {
        getAllRaidTask()
        .then((res) => {
            setTasks(res.data.data.tasks);
        })
        .catch((res) => {

        })
    }
    const fetchRaids = () => {
        getAllRaids()
        .then((res) => {
            setRaids(res.data.data.raids);
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
      fetchRaids();
      fetchTasks();
    }, [])
    
    return (
        <Wrapper>
            <LeftColumn>
                <TaskWrapper>
                    <TaskBox heading={"Available Tasks"} tasksNub={user?.raiderService?.analytics.availableTask ?? 0} />
                    <TaskBox heading={"Pending Tasks"} tasksNub={user?.raiderService?.analytics.pendingTask ?? 0} />
                    <TaskBox heading={"Completed Tasks"} tasksNub={user?.raiderService?.analytics.completedTask ?? 0} />
                </TaskWrapper>
            </LeftColumn>

            <RightColumn>
                <TaskNav>
                    <TaskNavItem isActive={currentTask === 1} onClick={() => setCurrentTask(1)}>Pending</TaskNavItem>
                    <TaskNavItem isActive={currentTask === 2} onClick={() => setCurrentTask(2)}>Available</TaskNavItem>
                </TaskNav>

                <Tasks>
                {
                       currentTask === 1 && raids.map((raid: any) => (
                            <Task>
                                <div>
                                    <h3>Twitter Raider</h3>
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
                                    <h3>{task?.raidInformation?.action}</h3>
                                    <p className="task-text">
                                       {task?.raidInformation?.campaignCaption}
                                    </p>
                                    <div>
                                        <p>
                                            <span>Raiders needed: </span>{task?.raidInformation?.amount}
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
                </Tasks>
            </RightColumn>
        </Wrapper>
    );
};

export default TaskDetailsNew;
