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
import { getSingleTask, startRaidTask } from "@/app/api/task";
import { getUser, setLoading, useDispatch, useSelector } from "@/lib/redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IProps {
    id: string
}

const TaskDetails: React.FC<IProps> = ({ id }) => {
    const [startTask, setStartTask] = useState<boolean>(false);
    const [uploadedProofs, setUploadedProofs] = useState<File[]>([]);
    const [url, setUrl] = useState<string>("");
    const [uploadedUrl, setUploadedUrl] = useState<string[]>([]);
    const [task, setTask] = useState<any>(null);
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
    const handleStartTask = () => {
            dispatch(setLoading(true));
            startRaidTask({
                taskId: id,
                serviceId: user.raiderService?._id,
            }).then((res) => {
                toast.success("Raid started successfully", {
                    position: toast.POSITION.TOP_RIGHT
                });
                dispatch(setLoading(false));
                router.push("/dashboard/tasks/twitter-raiders")
            }).catch((e: any) => {
                toast.error(e.response.data.error[0].message, {
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
    useEffect(() => {
      fetchTask()
    }, [])
    

    return (
        <Wrapper>
            <LeftColumn>
                <TaskWrapper style={{ top: "30px" }}>
                    <TaskBox heading={"Available Tasks"} tasksNub={1} />
                    <TaskBox heading={"Pending Tasks"} tasksNub={5} />
                    <TaskBox heading={"Completed Tasks"} tasksNub={50} />
                </TaskWrapper>
            </LeftColumn>

            <RightColumn style={{ marginTop: "10px" }}>
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
                        <BoldP>{task?.raidInformation?.raidLink}</BoldP>
                    </div>

                    <div>
                        <p>Actions</p>
                        <BoldP>
                            {
                                task?.raidInformation?.actions.map((val: any) => val + ", ")
                            }
                        </BoldP>
                    </div>

                    <div>
                        <p>Hashtag Suggestions</p>
                        <BoldP>#NFT #CRYPTOWORLD</BoldP>
                    </div>
                </Details>
                <Instructions>
                        <h4>Caption</h4>
                        <div className="instruction-grid">
                            <p>{task?.raidInformation?.campaignCaption}</p>
                        </div>
                </Instructions>
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
                <StartButton onClick={handleStartTask}>
                    Start Raid
                </StartButton>

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
