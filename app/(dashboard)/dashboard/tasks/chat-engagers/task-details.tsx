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


const TaskDetails: React.FC = () => {

    const [completed, setCompleted] = useState<any>([]); 
    const [startTask, setStartTask] = useState<boolean>(false);
    const [uploadedProofs, setUploadedProofs] = useState<File[]>([]);
    const [currentTask, setCurrentTask] = useState(2);
    const [available, setAvailable] = useState<any>([]);
    const [pending, setPending] = useState<any>([]);
    const router = useRouter();
    const user = useSelector(getUser);


    const fetchTasks = () => {
        getAllChatTask(20, 1)
        .then((res) => {
            setAvailable(res.data.data.tasks);
        })
        .catch((res) => {

        })
    }
    const fetchPending = () => {
        getAllChatOngoingTask(20, 1)
        .then((res) => {
            setPending(res.data.data.tasks);
        })
        .catch((res) => {
        })
    }
    const fetchCompletedRaids = () => {
        getAllChatCompletedTask(20, 1)
        .then((res) => {
            setCompleted(res.data.data.tasks);
        })
        .catch((res) => {
        })
    }
    useEffect(() => {
      fetchPending();
      fetchTasks();
      fetchCompletedRaids();
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
                    <TaskBox heading={"Available Tasks"} tasksNub={user?.moderatorService?.analytics.availableTask ?? 0} />
                    <TaskBox heading={"Pending Tasks"} tasksNub={user?.moderatorService?.analytics.pendingTask ?? 0} />
                    <TaskBox heading={"Completed Tasks"} tasksNub={user?.moderatorService?.analytics.completedTask ?? 0} />
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
                       currentTask === 1 && pending?.map((raid: any) => (
                            <Task>
                                <div>
                                    <h3>Twitter Raider</h3>
                                    <p className="task-text">
                                        <span>Task status: </span>pending
                                    </p>
                                    <div className="reward">
                                        <p>
                                            <span>Task timeline: </span>20min
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
                       currentTask === 2 && available?.map((task: any) => (
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
                                <button onClick={() => router.push(`/dashboard/tasks/chat-engagers/${task?.id}`)} style={{ marginBottom: "5px" }}>Claim</button>
                                <p>Reward: <span style={{ fontWeight: "600" }}>$10</span></p>
                            </div>
                        </Task>
                        ))
                    }
                    {
                       currentTask === 3 && completed?.map((task: any) => (
                            <Task>
                                <div>
                                    <h3>{task?.raidInformation?.action}</h3>
                                    <p className="task-text">
                                       {task?.raidInformation?.campaignCaption}
                                    </p>
                                    <div className="reward">
                                        <p>
                                            <span>Completed raids: </span>{task?.completedRaids}
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
