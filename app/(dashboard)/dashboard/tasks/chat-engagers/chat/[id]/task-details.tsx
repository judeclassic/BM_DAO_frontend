"use client";

import React, { ChangeEvent, DragEvent, useEffect, useState } from "react";
import {
    Wrapper,
    LeftColumn,
    RightColumn,
    TaskSub,
    Details,
    BoldP,
    StartButton,
    TextInput,
    TaskWrapper,
} from "../../../../../../styles/task-details.styles";
import TaskBox from "../../../../../../components/taskbox/TaskBox";
import { getUser, setLoading, useDispatch, useSelector } from "@/lib/redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { formatLink } from "@/lib/utils";
import Link from "next/link";
import { availbleChatterTask, getSinglechat, getTotalStatusTask } from "@/app/api/service";
import { baseURL } from "@/app/api/axios";

interface IProps {
    id: string
}

const TaskDetails: React.FC<IProps> = ({ id }) => {
    const [raid, setRaid] = useState<any>(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const [totalAvailbleTask, setTotalAvailbleTask] = useState<any>(0);
    const [totalPendingTask, setTotalPendingTask] = useState<any>(0);
    const [totalCompletedTask, setTotalCompletedTask] = useState<any>(0);


    const [proofs, setProofs] = useState<FileList | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      setProofs(selectedFiles);
    };
    

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(!proofs) {
            toast.error("Proofs required", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
       
        dispatch(setLoading(true));
        const formData = new FormData();
        formData.append('chatId', raid?.chat._id);
    
        for (let i = 0; i < proofs.length; i++) {
          formData.append('proof', proofs[i]);
        }
        const token: any =  localStorage.getItem("bmdao-token");
    
    
        try {
            const response = await fetch(`${baseURL}/user/worker/chatter/work/complete_raid`, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Replace with your actual token
                },
                method: 'POST',
                body: formData,
            });
        
            const result = await response.json();
        
            toast.success("chat completed successfully", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(setLoading(false));
            router.push("/dashboard/tasks/chat-engagers")
        } catch (error) {
            console.error('Error:', error);
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
        }
      };

   
    const fetchChat = () => {
        getSinglechat(id, 'STARTED')
        .then((res) => {
            setRaid(res.data.data)
        })
        .catch((e) => {
            console.log(e)
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
        fetchChat()
        totalPending()
        totalCompleted()
        fetchTasks()
        
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

            <RightColumn style={{ marginTop: "10px" }}>
                <TaskSub> Chatters</TaskSub>
                <Details>
                    <div>
                        <p>Task status:</p>
                        <BoldP>{raid?.chat.taskStatus}</BoldP>
                    </div>
                    <div>
                        <p>Task start at:</p>
                        <BoldP>{(new Date(raid?.chat?.startTime)).toUTCString()}</BoldP>
                    </div>

                    <div>
                        <p>Task to end after:</p>
                        <BoldP>{(new Date(raid?.chat?.endTime)).toUTCString()}</BoldP>
                    </div>

                    <div>
                        <p>Raid Link</p>
                        <Link href={formatLink(raid?.task?.data.chatInformation.postLink ?? "")} legacyBehavior>
                            <a style={{ color: "#f1c618", fontWeight: 500 }} target="_blank" href={formatLink(raid?.task?.data.chatInformation.postLink ?? "")} title={raid?.task?.data.chatInformation.postLink}>{(raid?.task?.data.chatInformation.postLink ?? "").substring(0, 20)}</a>
                        </Link>
                    </div>

                    <div>
                        <p>Action</p>
                        <BoldP>
                            {
                                raid?.task?.data.chatInformation.compaignCaption
                            }
                        </BoldP>
                    </div>
                </Details>

                <form onSubmit={handleSubmit} encType="multipart/form-data"> 
                
                    {
                        (raid?.timeLine !== "EXPIRED") && ( <div>
                        <h4>Proof Link</h4>
                        <TextInput style={{ marginTop: "10px" }}>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                            />
                        </TextInput>
                    </div>
                    )}
                    {
                        (raid?.timeLine !== "EXPIRED") && (
                            <StartButton>
                                <button type="submit">Complete Chat</button>
                            </StartButton>
                        )
                    }
                </form>
            </RightColumn>
        </Wrapper>
    );
};

export default TaskDetails;
