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
import { getAllRaiderServices } from "@/app/api/service";
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
            startRaidTask({
                taskId: id,
                serviceId: currentService,
            }).then((res) => {
                toast.success("Raid started successfully", {
                    position: toast.POSITION.TOP_RIGHT
                });
                dispatch(setLoading(false));
                router.push("/dashboard/tasks/twitter-raiders")
            }).catch((e: any) => {
                toast.error(e?.response?.data.error[0].message, {
                  position: toast.POSITION.TOP_RIGHT
                });
                dispatch(setLoading(false));
            })
    }
    const fetchTask = () => {
        getSingleTask(id)
        .then((res) => {
            setTask(res.data.data)
        })
        .catch((e) => {
            console.log(e)
        })
    }
    const fetchRaiderServices = () => {
        getAllRaiderServices()
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
    useEffect(() => {
      fetchTask();
      fetchRaiderServices();
    }, [])
    

    return (
        <Wrapper>
            <LeftColumn>
                <TaskWrapper style={{ marginTop: "60px" }}>
                    <TaskBox heading={"Available Tasks"} tasksNub={user.raiderService?.analytics.availableTask ?? 0} />
                    <TaskBox heading={"Pending Tasks"} tasksNub={user.raiderService?.analytics.pendingTask ?? 0} />
                    <TaskBox heading={"Completed Tasks"} tasksNub={user.raiderService?.analytics.completedTask ?? 0} />
                </TaskWrapper>
            </LeftColumn>

            {/* <RightColumn style={{ marginTop: "10px" }}>
                <TaskSub>Twitter Raiders</TaskSub>
                <Details>
                    <div>
                        <p>Task created at:</p>
                        <BoldP>{(new Date(task?.startedAt)).toUTCString()}</BoldP>
                    </div>

                    <div>
                        <p>Task to end before:</p>
                        <BoldP>{(new Date(task?.endedAt)).toUTCString()}</BoldP>
                    </div>

                    <div>
                        <p>Raid Link</p>
                        <Link href={formatLink(task?.raidInformation?.raidLink ?? "")} legacyBehavior>
                            <a style={{ color: "#f1c618", fontWeight: 500 }} target="_blank" href={formatLink(task?.raidInformation?.raidLink ?? "")} title={task?.raidInformation?.raidLink}>{(task?.raidInformation?.raidLink ?? "").substring(0, 20)}</a>
                        </Link>
                    </div>

                    <div>
                        <p>Action</p>
                        <BoldP>
                            {task?.raidInformation?.action }
                        </BoldP>
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
                <div>
                    <h4>Select Service</h4>
                    <TextInput style={{ marginTop: "10px" }}>
                        <select
                            value={currentService}
                            onChange={(event) =>
                                setCurrentService(event.target.value)
                            }
                        >
                            <option value={""}>Select a service</option>
                            {
                                services.filter((s: any) => (s.accountType === "raider") && (s?.subscriptionStatus === "ACTIVE")).map((raid: any, i: number) => (
                                    <option key={i} value={raid.id}>@{getAvailableHandle(raid.handles)}</option>
                                ))
                            }
                        </select>
                    </TextInput>
                </div>
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
                <StartButton onClick={handleStartTask}>
                    Start Task
                </StartButton>

                {startTask && (
                    <UploadContainer>
                        <div>
                            <h4>Upload Proof</h4>
                            <UploadBox
                                onDrop={(event: DragEvent<HTMLDivElement>) =>
                                    handleDrop(event)
                                }
                                onDragEnter={(
                                    event: DragEvent<HTMLDivElement>
                                ) => event.preventDefault()}
                                onDragOver={(
                                    event: DragEvent<HTMLDivElement>
                                ) => event.preventDefault()}
                            >
                                <Image src={uploadIcon} alt="upload icon" />
                                <FileInput>
                                    <p>
                                        Drag & Drop or
                                        <label htmlFor="upload-file">
                                            {" "}
                                            Choose file{" "}
                                        </label>
                                        <input
                                            type="file"
                                            hidden
                                            id="upload-file"
                                            accept="image/*"
                                            onChange={(event) =>
                                                handleImageChange(event)
                                            }
                                        />
                                        to upload
                                    </p>
                                </FileInput>
                            </UploadBox>
                        </div>

                        <div>
                            <h4>Upload Link</h4>
                            <TextInput>
                                <form
                                    onSubmit={(event) => event.preventDefault()}
                                >
                                    <input
                                        type="text"
                                        placeholder="Add URL"
                                        value={url}
                                        onChange={(event) =>
                                            setUrl(event.target.value)
                                        }
                                    />
                                </form>
                                <button onClick={() => addUrl()}>Upload</button>
                            </TextInput>
                        </div>

                        <UploadedDocContainer>
                            {(uploadedProofs.length !== 0 ||
                                uploadedUrl.length !== 0) && (
                                <div>
                                    <h4>Uploaded Proofs</h4>
                                    <ScreenshotContainer>
                                        {uploadedProofs?.map((item) => (
                                            <div
                                                key={uploadedProofs.indexOf(
                                                    item
                                                )}
                                            >
                                                <Image
                                                    src={imageDocIcon}
                                                    alt="Image document icon"
                                                />{" "}
                                                <p>
                                                    Screenshot{" "}
                                                    {uploadedProofs.indexOf(
                                                        item
                                                    ) + 1}
                                                </p>
                                                <Image
                                                    src={closeIcon}
                                                    alt="Close"
                                                />
                                            </div>
                                        ))}

                                        {uploadedUrl?.map((item) => (
                                            <div className="url-wrapper">
                                                <h4>Uploaded urls</h4>
                                                <div
                                                    key={uploadedUrl.indexOf(
                                                        item
                                                    )}
                                                    className="uploaded-url"
                                                >
                                                    <div>
                                                        <Image
                                                            src={linkIcon}
                                                            alt="Image document icon"
                                                        />{" "}
                                                        <p>{item}</p>
                                                    </div>
                                                    <button className="hidden-desktop">
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </ScreenshotContainer>
                                </div>
                            )}
                        </UploadedDocContainer>

                        <Buttons>
                            <BorderedButton>Cancel</BorderedButton>
                            <ColoredButton>Upload</ColoredButton>
                        </Buttons>
                    </UploadContainer>
                )}
            </RightColumn> */}
            
            <RightColumn>
                <TaskSub>Chat Engagers</TaskSub>
                <Details>

                    <div>
                        <p>Minimum Message Count:</p>
                        <BoldP>25</BoldP>
                    </div>

                    <div>
                        <p>Task Reward:</p>
                        <BoldP>500 BMT</BoldP>
                    </div>

                    <div>
                        <p>Social Media:</p>
                        <BoldP>Discord</BoldP>
                    </div>

                    <div>
                        <p>Client’s Community Link:</p>
                        <BoldP>www.BMDAO.com</BoldP>
                    </div>
                </Details>
                <div>
                    <h4>Select Time</h4>
                    <TextInput style={{ marginTop: "10px" }}>
                        <select
                            value={currentService}
                            onChange={(event) =>
                                setCurrentService(event.target.value)
                            }
                        >
                            <option value={""}>Select a service</option>
                            {
                                services.filter((s: any) => (s.accountType === "raider") && (s?.subscriptionStatus === "ACTIVE")).map((raid: any, i: number) => (
                                    <option key={i} value={raid.id}>12:00 GMT+1 - 1:00 GMT+1</option>
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
                    <StartButton onClick={() => router.push(`/dashboard/tasks/chat-engagers/complete/${id}`)}>
                        Claim Task
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
