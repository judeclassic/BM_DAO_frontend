"use client";

import { getAllModeratorCompletedTask, getAllModeratorOngoingTask, getAllModeratorTask } from "@/app/api/moderator";
import { moderatorRaiderTaskByStatus } from "@/app/api/service";
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

const RaidTaskDetailsNew = () => {
    const [tasks, setTasks] = useState<any>([]);
    const router = useRouter();
    const user = useSelector(getUser);
    const [totalTask, setTotalTask] = useState<any>(0);

    const fetchTasks = () => {
        moderatorRaiderTaskByStatus(1, 100, "COMPLETED")
        .then((res) => {
            setTasks(res.data.data.raids);
            setTotalTask(res.data.data.totalRaids)
        })
        .catch((res) => {

        })
    }
    
    useEffect(() => {
      fetchTasks();
    }, [])
    
    return (
        <Wrapper>
            <RightColumn>
              
                <Tasks>
                    <Task>
                        <div>
                            <h3>Raider</h3>
                            <p className="task-text">
                                <span>Total task: </span>{totalTask}
                            </p>
                        </div>

                        <div className="claim">
                            <button onClick={() => router.push(`/dashboard/tasks/moderators/task/raider`)}>Moderate</button>
                        </div>
                    </Task>
                </Tasks>
            </RightColumn>
        </Wrapper>
    );
};

export default RaidTaskDetailsNew;
