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
    UploadContainer,
    UploadBox,
    FileInput,
    TextInput,
    Buttons,
    BorderedButton,
    ColoredButton,
    UploadedDocContainer,
    ScreenshotContainer,
    TaskWrapper,
} from "../../../../../styles/task-details.styles";
import TaskBox from "../../../../../components/taskbox/TaskBox";
import Image from "next/image";
import uploadIcon from "../../../../../../public/upload-icon.svg";
import imageDocIcon from "../../../../../../public/img-doc-icon.svg";
import closeIcon from "../../../../../../public/close-icon.svg";
import linkIcon from "../../../../../../public/link-icon.svg";
import { completeRaidTask, getSingleRaid, getSingleTask, startRaidTask } from "@/app/api/task";
import { getUser, setLoading, useDispatch, useSelector } from "@/lib/redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { availbleChatterTask, getAllRaiderServices, getChatterServices, getSinglechat, getStatusTask, getTotalStatusTask, startChatTask } from "@/app/api/service";
import { formatLink, getAvailableHandle } from "@/lib/utils";
import Link from "next/link";

interface IProps {
    id: string
}

const ChatDetails: React.FC<IProps> = ({ id }) => {
    const [startTask, setStartTask] = useState<boolean>(false);
    const [uploadedProofs, setUploadedProofs] = useState<File[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [currentService, setCurrentService] = useState("");
    const [url, setUrl] = useState<string>("");
    const [uploadedUrl, setUploadedUrl] = useState<string[]>([]);
    const [task, setTask] = useState<any>(null);
    const [proof, setProof] = useState("");
    const [raid, setRaid] = useState<any>(null);
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const router = useRouter();

    const [totalAvailbleTask, setTotalAvailbleTask] = useState<any>(0);
    const [totalPendingTask, setTotalPendingTask] = useState<any>(0);
    const [totalCompletedTask, setTotalCompletedTask] = useState<any>(0);

    const addUrl = () => {
        if (url === "") {
            return;
        }
        setUploadedUrl([...uploadedUrl, url]);

        setUrl("");
    };

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
    const handleCompleteRaid = () => {
        if(!proof) {
            toast.error("Proof required", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        dispatch(setLoading(true));
        completeRaidTask({
            raidId: raid?.id,
            serviceId: user.raiderService?._id,
            proofs: [proof]
        }).then((res) => {
            toast.success("Raid completed successfully", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(setLoading(false));
            router.push("/dashboard/tasks/twitter-raiders")
        }).catch((e: any) => {
            if(e?.response?.data?.error[0].message) { 
                toast.error(e?.response?.data.error[0].message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                dispatch(setLoading(false));
                return
            }
            if(e?.message) { 
                toast.error(e.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                dispatch(setLoading(false));
                return
            }
            dispatch(setLoading(false));
            return
        })
    }
    const handleStartTask = () => {
            if(!currentService) {
                toast.error("Please select a service to use for this task.", {
                    position: toast.POSITION.TOP_RIGHT
                });
                return;
            }
            
            dispatch(setLoading(true));
            startChatTask({
                chatId: id,
                serviceId: currentService,
            })
            // startRaidTask({
            //     taskId: id,
            //     serviceId: currentService,
            // })
            .then((res) => {
                toast.success("chat started successfully", {
                    position: toast.POSITION.TOP_RIGHT
                });
                dispatch(setLoading(false));
                router.push("/dashboard/tasks/chat-engagers")
            }).catch((e: any) => {
                toast.error(e?.response?.data.error[0].message, {
                  position: toast.POSITION.TOP_RIGHT
                });
                dispatch(setLoading(false));
            })
    }
    const fetchTask = () => {
        getSinglechat(id, "PENDING")
        .then((res) => {
            setTask(res.data.data)
            console.log('task', res.data)
        })
        .catch((e) => {
            console.log(e)
        })
    }
    const fetchChatterServices = () => {
        getChatterServices()
        // getAllRaiderServices()
        .then((res) => {
          setServices(res.data.data.userServices);
          dispatch(setLoading(false));
        }).catch((e: any) => {
          toast.error(e?.response?.data.error[0].message, {
            position: toast.POSITION.TOP_RIGHT
          });
          dispatch(setLoading(false));
        })
      }

    const fetchTasks = () => {
        availbleChatterTask(100, 1, "PENDING")
        .then((res) => {
            setTotalAvailbleTask(res.data.data.totalTask)
        })
        .catch((res) => {
            
        })
    }

    const totalPending = () => {
        getTotalStatusTask('STARTED')
        .then((res) => {
            setTotalPendingTask(res.data.data);
        })
        .catch((res) => {
        })
    }

    const totalCompleted = () => {
        getTotalStatusTask('COMPLETED')
        .then((res) => {
            setTotalCompletedTask(res.data.data);
        })
        .catch((res) => {
        })
    }

    useEffect(() => {
      fetchTask();
      fetchChatterServices();
      fetchTasks()
      totalPending()
      totalCompleted()
    }, [])
    

    return (
        <Wrapper>
            <LeftColumn>
                <TaskWrapper style={{ marginTop: "60px" }}>
                    <TaskBox heading={"Available Tasks"} tasksNub={ totalAvailbleTask? totalAvailbleTask : 0} type={"Chats"}/>
                    <TaskBox heading={"Pending Tasks"} tasksNub={totalPendingTask? totalPendingTask : 0} type={"Chats"}/>
                    <TaskBox heading={"Completed Tasks"} tasksNub={totalCompletedTask? totalCompletedTask: 0} type={"Chats"}/>
                </TaskWrapper>
            </LeftColumn>
            
            <RightColumn>
                <TaskSub>Chat Engagers</TaskSub>
                <Details>

                    <div>
                        <p>Minimum Message Count:</p>
                        <BoldP>25</BoldP>
                    </div>

                    <div>
                        <p>Task Reward:</p>
                        <BoldP>400 BMT</BoldP>
                    </div>

                    <div>
                        <p>Social Media:</p>
                        <BoldP>Discord</BoldP>
                    </div>

                    <div>
                        <p>Client’s Community Link:</p>
                        <BoldP>www.BMDAO.com</BoldP>
                    </div>
                    <div>
                        <p>Start Time:</p>
                        <BoldP>{(new Date(task?.chat?.startTime)).toUTCString()}</BoldP>
                    </div>
                    <div>
                        <p>End Time:</p>
                        <BoldP>{(new Date(task?.chat?.endTime)).toUTCString()}</BoldP>
                    </div>
                    <div>
                        <p>Action:</p>
                        <BoldP>{task?.task?.data.chatInformation.compaignCaption}</BoldP>
                    </div>
                    <div>
                        <p>Chat Link:</p>
                        <BoldP>{task?.task?.data.chatInformation.postLink}</BoldP>
                    </div>
                </Details>
                <div>
                    <h4>Select service</h4>
                    <TextInput style={{ marginTop: "10px" }}>
                        <select
                            value={currentService}
                            onChange={(event) =>
                                setCurrentService(event.target.value)
                            }
                        >
                            <option value={""}>Select a service</option>
                            {
                                services.filter((s: any) => (s.accountType === "chatter") && (s?.subscriptionStatus === "ACTIVE")).map((chatter: any, i: number) => (
                                    <option key={i} value={chatter.id}>@{getAvailableHandle(chatter.handles)}</option>
                                ))
                            }
                        </select>
                    </TextInput>
                </div>
                {startTask || (
                    <Instructions>
                        <h4>Task Instruction</h4>
                        <p>
                            1. Join the Client’s Discord Community using the
                            provided invite link.
                        </p>
                        <p>
                            2. Engage in conversations and contribute at least
                            25 meaningful messages within the allocated time.
                        </p>
                        <p>
                            3. Ensure that your messages are relevant,
                            respectful, and add value to the community
                            discussions.
                        </p>
                        <p>
                            4. Be active and responsive during the task duration
                            to encourage interactions and build connections.
                        </p>
                        <p>
                            5. Take screenshots as proof of completing the
                            tasks.
                        </p>
                    </Instructions>
                )}
                {startTask || (
                    <StartButton onClick={handleStartTask}>
                        Start Task
                    </StartButton>
                )}

                {startTask &&  (raid?.timeLine !== "EXPIRED") && ( <div>
                    <h4>Proof Link</h4>
                    <TextInput style={{ marginTop: "10px" }}>
                        <input
                            type="text"
                            placeholder="Enter proof image link"
                            value={proof}
                            onChange={(event) =>
                                setProof(event.target.value)
                            }
                        />
                    </TextInput>
                </div>
                )}
                {startTask && 
                    (raid?.timeLine !== "EXPIRED") && (
                        <StartButton onClick={handleCompleteRaid}>
                            Complete Raid
                        </StartButton>
                )}
            </RightColumn>
        </Wrapper>
    );
};

export default ChatDetails;
