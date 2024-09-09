"use client";

import React, { ChangeEvent, DragEvent, useEffect, useState } from "react";
import {
    Wrapper,
    LeftColumn,
    RightColumn,
    TaskSub,
    Details,
    BoldP,
    Instructions,
    StartButton,
    TaskImageWrapper,
    TextInput,
    TaskWrapper,
    Tasks,
    Task,
} from "../../../../../../styles/task-details.styles";
import TaskBox from "../../../../../../components/taskbox/TaskBox";
import { getSingleTask, startRaidTask } from "@/app/api/task";
import { getUser, setLoading, useDispatch, useSelector } from "@/lib/redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { approveChatTask, getAllModeratorServices, getAllModeratorTaskRaids, getAllRaiderServices, loadChatterToModerate, rejectChatTask } from "@/app/api/service";
import { getModeratorSingleTask, markTaskCompleted, moderateTask } from "@/app/api/moderator";
import { formatLink } from "@/lib/utils";
import Link from "next/link";

interface IProps {
    id: string
}

const TaskDetails: React.FC<IProps> = ({ id }) => {
    const user = useSelector(getUser);

    const [task, setTask] = useState<any>(null);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

    const [imgTask, setImgTask] = useState<any>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const dispatch = useDispatch();
    const router = useRouter();

    const images = [
        'data:image/png;base64,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',
        'data:image/png;base64,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',
        'data:image/jpeg;base64,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'
    ]

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imgTask?.length);
    };
    
      const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imgTask?.length) % imgTask?.length);
    };

    const handleMarkAsComplete = () => {
        dispatch(setLoading(false));
        const oldIndex = currentTaskIndex
        approveChatTask({
            chatId: task?.[currentTaskIndex]?._id,
        }).then((res) => {
            toast.success("Task approved successfully", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(setLoading(false));
            setCurrentTaskIndex((prevIndex) => (prevIndex + 1) % task.length);
            setCurrentIndex(0)
            const newIndex = currentTaskIndex
            let imgIndex = currentTaskIndex
            if (oldIndex === newIndex && oldIndex === 0) {
                imgIndex = imgIndex + 1
            } else {
                imgIndex = currentTaskIndex
            }
            setImgTask(task?.[imgIndex]?.proofs)
        }).catch((e: any) => {
            toast.error(e?.response?.data.error[0].message, {
              position: toast.POSITION.TOP_RIGHT
            });
            setCurrentTaskIndex((prevIndex) => (prevIndex + 1) % task.length);
            setCurrentIndex(0)
            setImgTask(task?.[currentTaskIndex]?.proofs)
            dispatch(setLoading(false));
        })
        
    }

    const handleRejectTask = () => {
        dispatch(setLoading(false));
        const oldIndex = currentTaskIndex
        rejectChatTask({
            chatId: task?.[currentTaskIndex]?._id,
        }).then((res) => {
            toast.success("Task rejected successfully", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(setLoading(false));
            setCurrentTaskIndex((prevIndex) => (prevIndex + 1) % task.length);
            setCurrentIndex(0)
            setImgTask(task?.[currentTaskIndex]?.proofs)
        }).catch((e: any) => {
            toast.error(e?.response?.data.error[0].message, {
              position: toast.POSITION.TOP_RIGHT
            });
            setCurrentTaskIndex((prevIndex) => (prevIndex + 1) % task.length);
            setCurrentIndex(0)
            const newIndex = currentTaskIndex
            let imgIndex = currentTaskIndex
            if (oldIndex === newIndex && oldIndex === 0) {
                imgIndex = imgIndex + 1
            } else {
                imgIndex = currentTaskIndex
            }
            setImgTask(task?.[imgIndex]?.proofs)
            dispatch(setLoading(false));
        })
    }

    const fetchTask = () => {
        loadChatterToModerate()
        .then((res) => {
            setTask(res?.data?.data?.tasks)
            setImgTask(res?.data?.data?.tasks?.[0].proofs)
        })
        .catch((e) => {
            console.log(e)
        })
    }
    useEffect(() => {
        fetchTask();
    }, [])
    const [startTask, setStartTask] = useState(false)

    return (
        <Wrapper>
        <LeftColumn>
            <TaskImageWrapper style={{ marginTop: "60px", height: "100%", width: "90%" }}>
                <img style={{height: "100%", width: "100%"}} src={imgTask?.[currentIndex]} alt={`Image ${currentIndex}`} />
            </TaskImageWrapper>
            <div style={{ display: "flex", justifyContent: "space-between", gap:"10px" }}>
                    <StartButton onClick={prevImage} disabled={currentIndex === 0}>Prev</StartButton>
                    <StartButton onClick={nextImage} disabled={currentIndex === imgTask?.length - 1}>Next</StartButton>
            </div>
        </LeftColumn>

        <RightColumn style={{ marginTop: "10px" }}>
            <TaskSub>Chatter</TaskSub>
             <Details>

                <div>
                    <p>Minimum Message Count:</p>
                    <BoldP>25</BoldP>
                </div>

                <div>
                    <p>Task Reward:</p>
                    {/* {task?.map((chat: any) => (
                        <BoldP>{chat.taskId.chatInformation.compaignCaption}</BoldP>
                    ))} */}
                    <BoldP>0.1</BoldP>
                </div>

                <div>
                    <p>Social Media:</p>
                    <BoldP>{task?.[currentTaskIndex]?.taskId?.chatInformation?.compaignCaption}</BoldP>
                </div>
                <div>
                    <p>Social Media Link:</p>
                    <BoldP>{task?.[currentTaskIndex]?.taskId?.chatInformation?.postLink}</BoldP>
                </div>
                <div>
                    <p>Number of uploads:</p>
                    <BoldP>{task?.[currentTaskIndex]?.proofs?.length}</BoldP>
                </div>
                <div>
                    <p>Client’s Community Link:</p>
                    <BoldP>www.BMDAO.com</BoldP>
                </div>
            </Details>
            {
                task?.raidInformation?.campaignCaption && (
                    <Instructions>
                            <h4>Caption</h4>
                            <div className="instruction-grid">
                                <p>{task?.raidInformation?.campaignCaption}</p>
                            </div>
                    </Instructions>
                )
            }
            {startTask || (
                <Instructions>
                    <h4>Task Instruction</h4>
                    <div className="instruction-grid">
                        <p>1.</p>
                        <p>
                            Join the Client&amp;s Discord Community using the
                            provided invite link.
                        </p>
                    </div>

                    <div className="instruction-grid">
                        <p>2.</p>
                        <p>
                            Engage in conversations and contribute at least
                            25 meaningful messages within the allocated
                            time.
                        </p>
                    </div>

                    <div className="instruction-grid">
                        <p>3.</p>
                        <p>
                            Ensure that your messages are relevant,
                            respectful, and add value to the community
                            discussions.
                        </p>
                    </div>

                    <div className="instruction-grid">
                        <p>4.</p>
                        <p>
                            Be active and responsive during the task
                            duration to encourage interactions and build
                            connections.
                        </p>
                    </div>

                    <div className="instruction-grid">
                        <p>5.</p>
                        <p>
                            Take screenshots as proof of completing the
                            tasks.
                        </p>
                    </div>
                </Instructions>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <StartButton onClick={handleRejectTask}>Reject</StartButton>
                    <StartButton onClick={handleMarkAsComplete}>Accept</StartButton>
            </div>
        </RightColumn>
    </Wrapper>
    );
};

export default TaskDetails;
