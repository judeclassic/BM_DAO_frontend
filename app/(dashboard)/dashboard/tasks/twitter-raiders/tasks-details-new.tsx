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
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TaskDetailsNew = () => {
    const [tasks, setTasks] = useState<any>([]);
    const [raids, setRaids] = useState<any>([]);
    const [currentTask, setCurrentTask] = useState(2);
    const router = useRouter();

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
    useEffect(() => {
      fetchRaids();
      fetchTasks();
    }, [])
    
    return (
        <Wrapper>
            <LeftColumn>
                <TaskWrapper>
                    <TaskBox heading={"Available Tasks"} tasksNub={1} />
                    <TaskBox heading={"Pending Tasks"} tasksNub={5} />
                    <TaskBox heading={"Completed Tasks"} tasksNub={50} />
                </TaskWrapper>
            </LeftColumn>

            <RightColumn>
                <TaskNav>
                    <TaskNavItem isActive={currentTask === 1} onClick={() => setCurrentTask(1)}>Raids</TaskNavItem>
                    <TaskNavItem isActive={currentTask === 2} onClick={() => setCurrentTask(2)}>Major Tasks</TaskNavItem>
                    <TaskNavItem isActive={currentTask === 3} onClick={() => setCurrentTask(3)}>Minor Tasks</TaskNavItem>
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
                                    <h3>Raider</h3>
                                    <p className="task-text">
                                       {task?.raidInformation?.campaignCaption}
                                    </p>
                                    <div className="reward">
                                        <p>
                                            <span>Raiders needed: </span>{task?.raidInformation?.amount}
                                        </p>
                                    </div>
                                </div>
        
                                <div className="claim">
                                    <button onClick={() => router.push(`/dashboard/tasks/twitter-raiders/${task?.id}`)}>Claim</button>
                                    <p>{task?.completedRaids}/{task?.totalRaids} left</p>
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
