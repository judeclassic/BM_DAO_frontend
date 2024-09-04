"use client";

import React, { useEffect, useState } from "react";
import {
    Wrapper,
    LeftColumn,
    RightColumn,
    TaskSub,
    Details,
    BoldP,
    Instructions,
    StartButton,
    TextInput,
    TaskWrapper,
} from "../../../../../../styles/task-details.styles";
import TaskBox from "../../../../../../components/taskbox/TaskBox";
import { getSingleRaid,} from "@/app/api/task";
import { setLoading, useDispatch } from "@/lib/redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { formatLink } from "@/lib/utils";
import Link from "next/link";
import { raiderAvailbleTaskForDay, raiderTaskByStatus } from "@/app/api/service";
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
        formData.append('raidId', raid?.id);
        // formData.append('serviceId', user.raiderService?._id);
       
        for (let i = 0; i < proofs.length; i++) {
          formData.append('proof', proofs[i]);
        }
        const token: any =  localStorage.getItem("bmdao-token");
    
    
        try {
            const response = await fetch(`${baseURL}/user/worker/raider/raid/complete_raid`, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Replace with your actual token
                },
                method: 'POST',
                body: formData,
            });
        
            const result = await response.json();
            toast.success("Raid completed successfully", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(setLoading(false));
            router.push("/dashboard/tasks/twitter-raiders")
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
    

    const fetchRaid = () => {
        getSingleRaid(id)
        .then((res) => {
            setRaid(res.data.data)
        })
        .catch((e) => {
            console.log(e)
        })
    }

    const fetchAvailableTasks = () => {
        raiderAvailbleTaskForDay(1, 100)
        .then((res) => {
            setTotalAvailbleTask(res.data.data.totalTasks)
        })
        .catch((res) => {

        })
    }
    const fetchPendingRaids = () => {
        raiderTaskByStatus(1, 1000, "STARTED")
        .then((res) => {
            setTotalPendingTask(res.data.data.totalRaids)
        })
        .catch((res) => {

        })
    }
    const fetchCompletedRaids = () => {
        raiderTaskByStatus(1, 1000, "COMPLETED")
        .then((res) => {
            setTotalCompletedTask(res.data.data.totalRaids)      
        })
        .catch((res) => {

        })
    }
    
    useEffect(() => {
      fetchRaid()
      fetchAvailableTasks()
      fetchPendingRaids()
      fetchCompletedRaids()
    }, [])
    

    return (
        <Wrapper>
            <LeftColumn>
                <TaskWrapper style={{ marginTop: "60px" }}>
                    <TaskBox heading={"Available Tasks"} tasksNub={totalAvailbleTask ?? 0} />
                    <TaskBox heading={"Pending Tasks"} tasksNub={totalPendingTask ?? 0} />
                    <TaskBox heading={"Completed Tasks"} tasksNub={totalCompletedTask ?? 0} />
                </TaskWrapper>
            </LeftColumn>

            <RightColumn style={{ marginTop: "10px" }}>
                <TaskSub>Twitter Raiders</TaskSub>
                <Details>
                    <div>
                        <p>Task status:</p>
                        <BoldP>{raid?.taskStatus}</BoldP>
                    </div>
                    <div>
                        <p>Task created at:</p>
                        <BoldP>{(new Date(raid?.task?.startedAt)).toUTCString()}</BoldP>
                    </div>

                    <div>
                        <p>Task to end before:</p>
                        <BoldP>{(new Date(raid?.task?.endedAt)).toUTCString()}</BoldP>
                    </div>

                    <div>
                        <p>Raid Link</p>
                        <Link href={formatLink(raid?.task?.raidInformation?.raidLink ?? "")} legacyBehavior>
                            <a style={{ color: "#f1c618", fontWeight: 500 }} target="_blank" href={formatLink(raid?.task?.raidInformation?.raidLink ?? "")} title={raid?.task?.raidInformation?.raidLink}>{(raid?.task?.raidInformation?.raidLink ?? "").substring(0, 20)}</a>
                        </Link>
                    </div>

                    <div>
                        <p>Action</p>
                        <BoldP>
                            {
                                raid?.task?.raidInformation?.action
                            }
                        </BoldP>
                    </div>
                </Details>
                {
                    raid?.task?.raidInformation?.campaignCaption && (
                        <Instructions>
                                <h4>Caption</h4>
                                <div className="instruction-grid">
                                    <p>{raid?.task?.raidInformation?.campaignCaption}</p>
                                </div>
                        </Instructions>
                    )
                }
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
                               <button type="submit">Complete Raid</button>
                            </StartButton>
                        )
                    }
                </form>       
            </RightColumn>
        </Wrapper>
    );
};

export default TaskDetails;
