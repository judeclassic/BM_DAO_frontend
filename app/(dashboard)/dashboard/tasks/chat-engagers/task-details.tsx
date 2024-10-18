"use client";

import React, { ChangeEvent, DragEvent, useState, useEffect } from "react";
// import {
//     Wrapper,
//     LeftColumn,
//     RightColumn,
//     TaskSub,
//     Details,
//     BoldP,
//     Instructions,
//     StartButton,
//     UploadContainer,
//     UploadBox,
//     FileInput,
//     TextInput,
//     Buttons,
//     BorderedButton,
//     ColoredButton,
//     UploadedDocContainer,
//     ScreenshotContainer,
//     TaskWrapper,
// } from "../../../../styles/task-details.styles";
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
import TaskBox from "../../../../components/taskbox/TaskBox";
import Image from "next/image";
import uploadIcon from "../../../../../public/upload-icon.svg";
import imageDocIcon from "../../../../../public/img-doc-icon.svg";
import closeIcon from "../../../../../public/close-icon.svg";
import { useRouter } from "next/navigation";
import { getAllChatCompletedTask, getAllChatOngoingTask, getAllChatTask } from "@/app/api/moderator";
import { getUser, useSelector } from "@/lib/redux";
import { availbleChatterTask, getChatterTask, getSingleChatterTask, getStatusTask, getTotalStatusTask } from "@/app/api/service";
import { AxiosResponse } from "axios";


const TaskDetails: React.FC = () => {

    const [completed, setCompleted] = useState<any>([]); 
    const [startTask, setStartTask] = useState<boolean>(false);
    const [uploadedProofs, setUploadedProofs] = useState<File[]>([]);
    const [currentTask, setCurrentTask] = useState(2);
    const [available, setAvailable] = useState<any>([]);
    const [pending, setPending] = useState<any>([]);
    const router = useRouter();
    const user = useSelector(getUser);
    const [totalAvailbleTask, setTotalAvailbleTask] = useState<any>(0);
    const [totalPendingTask, setTotalPendingTask] = useState<any>(0);
    const [totalCompletedTask, setTotalCompletedTask] = useState<any>(0);


    const fetchTasks = () => {
        availbleChatterTask(100, 1, "PENDING")
        .then((res) => {
            setAvailable(res.data.data.data)
            setTotalAvailbleTask(res.data.data.totalTask)
        })
        .catch((res) => {
           
        })
    }
    const fetchPending = () => {
        getStatusTask('STARTED')
        .then((res) => {
            console.log("res", res.data.data)
            setPending(res.data.data);
        })
        .catch((res) => {
        })
    }
    const fetchCompletedChats = () => {
        getStatusTask('COMPLETED')
        .then((res) => {
            setCompleted(res.data.data);
        })
        .catch((res) => {
        })
    }

    const totalPending = () => {
        getTotalStatusTask('STARTED')
        .then((res) => {
            console.log("res", res.data.data)
            setTotalPendingTask(res.data.data);
        })
        .catch((res) => {
        })
    }

    const totalCompleted = () => {
        getTotalStatusTask('COMPLETED')
        .then((res) => {
            console.log("res", res.data.data)
            setTotalCompletedTask(res.data.data);
        })
        .catch((res) => {
        })
    }
    useEffect(() => {
      fetchPending();
      fetchTasks();
      fetchCompletedChats();
      totalPending();
      totalCompleted()
    }, [])

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        console.log("Dropped");
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setUploadedProofs([...uploadedProofs, file]);
        }
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setUploadedProofs([...uploadedProofs, file]);
        }
    };

    return (
        <Wrapper>
            <LeftColumn>
                <TaskWrapper>
                    <TaskBox heading={"Available Tasks"} tasksNub={ totalAvailbleTask? totalAvailbleTask : 0} type={"Chats"}/>
                    <TaskBox heading={"Pending Tasks"} tasksNub={totalPendingTask? totalPendingTask : 0} type={"Chats"}/>
                    <TaskBox heading={"Completed Tasks"} tasksNub={totalCompletedTask? totalCompletedTask: 0} type={"Chats"}/>
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
                       currentTask === 1 && pending?.map((chat: any) => (
                            <Task>
                                <div>
                                    <h3>{chat.task.data.chatInformation.compaignCaption}</h3>
                                    <p className="task-text">
                                        <span>End Time: </span>{(new Date(chat?.chat?.endTime)).toUTCString()}
                                    </p>
                                    <p className="task-text">
                                        <span>Task status: </span>{chat.chat.taskStatus}
                                    </p>
                                    <div className="reward">
                                        <p>
                                            <span>Task timeline: {chat.chat.timeLine / (1000 * 60 * 60)} hour </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="claim">
                                    <button onClick={() => router.push(`/dashboard/tasks/chat-engagers/chat/${chat.chat?.id}`)}>View</button>
                                </div>
                            </Task>
                        ))
                    }
                    {
                       currentTask === 2 && available?.map((task: any) => (
                        <Task>
                            <div>
                                <h3>{task.task?.data.chatInformation?.compaignCaption}</h3>
                                <p className="task-text">
                                {/* {task.task?.data?.chatInformation.compaignCaption} */}
                                </p>
                                <div>
                                    <p>
                                        <span>start time: </span>{(new Date(task?.chat?.startTime)).toUTCString()}
                                    </p>
                                    <p>
                                        <span>end time: </span>{(new Date(task?.chat?.endTime)).toUTCString()}
                                    </p>
                                </div>
                            </div>

                            <div className="claim">
                                <button onClick={() => router.push(`/dashboard/tasks/chat-engagers/${task.chat?._id}`)} style={{ marginBottom: "5px" }}>Claim</button>
                                <p>Reward: <span style={{ fontWeight: "600" }}>$10</span></p>
                            </div>
                        </Task>
                        ))
                    }
                    {
                       currentTask === 3 && completed?.map((task: any) => (
                            <Task>
                                <div>
                                    <h3>{task?.task?.data.chatInformation.compaignCaption}</h3>
                                    <p className="task-text">
                                       {task?.raidInformation?.campaignCaption}
                                    </p>
                                    <div className="reward">
                                        <p>
                                            <span>Completed raids: </span>{task?.task?.data.completedTasks}
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

export default TaskDetails;
