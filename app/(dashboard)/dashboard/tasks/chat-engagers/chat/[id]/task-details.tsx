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
} from "../../../../../../styles/task-details.styles";
import TaskBox from "../../../../../../components/taskbox/TaskBox";
import Image from "next/image";
import uploadIcon from "../../../../../../public/upload-icon.svg";
import imageDocIcon from "../../../../../../public/img-doc-icon.svg";
import closeIcon from "../../../../../../public/close-icon.svg";
import linkIcon from "../../../../../../public/link-icon.svg";
import { completeRaidTask, getSingleRaid, getSingleTask, startRaidTask } from "@/app/api/task";
import { getUser, setLoading, useDispatch, useSelector } from "@/lib/redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { formatLink } from "@/lib/utils";
import Link from "next/link";
import { availbleChatterTask, completeChatTask, getSinglechat, getTotalStatusTask } from "@/app/api/service";

interface IProps {
    id: string
}

const TaskDetails: React.FC<IProps> = ({ id }) => {
    const [startTask, setStartTask] = useState<boolean>(false);
    const [uploadedProofs, setUploadedProofs] = useState<File[]>([]);
    const [url, setUrl] = useState<string>("");
    const [uploadedUrl, setUploadedUrl] = useState<string[]>([]);
    const [raid, setRaid] = useState<any>(null);
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const router = useRouter();
    const [proof, setProof] = useState("");
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
    const handleCompleteChat = () => {
            if(!proof) {
                toast.error("Proof required", {
                    position: toast.POSITION.TOP_RIGHT
                });
                return;
            }
            dispatch(setLoading(true));
            completeChatTask({
                chatId: raid?.chat._id,
                proofs: [proof]
            }).then((res) => {
                toast.success("chat completed successfully", {
                    position: toast.POSITION.TOP_RIGHT
                });
                dispatch(setLoading(false));
                router.push("/dashboard/tasks/chat-engagers")
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
                {
                    // raid?.task?.data.chatInformation.compaignCaption && (
                    //     <Instructions>
                    //             <h4>Caption</h4>
                    //             <div className="instruction-grid">
                    //                 <p>{raid?.task?.data.chatInformation.compaignCaption}</p>
                    //             </div>
                    //     </Instructions>
                    // )
                }
                {/* {startTask || (
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
                )} */}
                {
                    (raid?.timeLine !== "EXPIRED") && ( <div>
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
                {
                    (raid?.timeLine !== "EXPIRED") && (
                        <StartButton onClick={handleCompleteChat}>
                            Complete Raid
                        </StartButton>
                    )
                }

                {/* {startTask && (
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
                )} */}
            </RightColumn>
        </Wrapper>
    );
};

export default TaskDetails;
