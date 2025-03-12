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
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ChatTaskDetails = () => {
    const [tasks, setTasks] = useState<any>([]);
    const [totalTask, setTotalTask] = useState<any>(0);
    const router = useRouter();

    // const fetchTasks = () => {
    //     chatterTaskByStatus(1, 100, "COMPLETED")
    //     .then((res) => {
    //         setTasks(res.data.data.chats);
    //         setTotalTask(res.data.data.totalChats)
    //     })
    //     .catch((res) => {

    //     })
    // }
    // useEffect(() => {
    //   fetchTasks();
    // }, [])
    
    return (
        <Wrapper>
            <RightColumn>         
                <Tasks>
                    <Task>
                        <div>
                            <h3>Chatter</h3>
                            <p className="task-text">
                                <span>Total Task: </span>{totalTask}
                            </p>
                        </div>
                        <div className="claim">
                            <button onClick={() => router.push(`/dashboard/tasks/moderators/task/chatter`)}>Moderate</button>
                        </div>
                    </Task>
                </Tasks>     
            </RightColumn>
        </Wrapper>
    );
};

export default ChatTaskDetails;
