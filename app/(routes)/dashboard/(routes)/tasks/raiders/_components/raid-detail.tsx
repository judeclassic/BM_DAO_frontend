"use client";

import React, { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import uploadIcon from "../../../../../../../public/upload-icon.svg";
import imageDocIcon from "../../../../../../../public/img-doc-icon.svg";
import closeIcon from "../../../../../../../public/close-icon.svg";
import linkIcon from "../../../../../../../public/link-icon.svg";
import { formatLink, getAvailableHandle } from "@/lib/utils";
import Link from "next/link";
import TaskBox from "@/app/(routes)/dashboard/_components/taskbox/TaskBox";
import { Wrapper } from "@/app/styles/academy.style";
import { Buttons } from "@/app/styles/client-wallet.style";
import { LeftColumn, TaskWrapper, RightColumn, TaskSub, Details, BoldP, Instructions, TextInput, StartButton, UploadContainer, UploadBox, FileInput, UploadedDocContainer, ScreenshotContainer, BorderedButton, ColoredButton } from "@/app/styles/task-details.styles";
import { useRaiderTaskFeature } from "@/lib/hooks/raider/task";
import { RaidTaskStatus } from "@/lib/types/raider/raid.interface";

interface IProps {
    id: string
}

const RaidDetail: React.FC<IProps> = ({ id }) => {
    const [ uploadedProofs, setUploadedProofs ] = useState<File[]>([]);
    const [ url, setUrl ] = useState<string>("");
    const [ uploadedUrl, setUploadedUrl ] = useState<string[]>([]);
    const isLoaded = useRef(false);

    const { handleCompleteTask, currentRaid, getRaid } = useRaiderTaskFeature()

    const addUrl = () => {
        if (url === "") return;
        setUploadedUrl([...uploadedUrl, url]);
        setUrl("");
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) setUploadedProofs([...uploadedProofs, file]);
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) setUploadedProofs([...uploadedProofs, file]);
    };

    useEffect(() => {
        if (isLoaded.current) return;
        getRaid({ raid_id: id });
        isLoaded.current = true;
    }, []);

    return (
        <Wrapper>
            <LeftColumn>
                <TaskWrapper style={{ marginTop: "60px" }}>
                    <TaskBox heading={"Total Tasks"} tasksNub={currentRaid?.task?.total_raids ?? 0} />
                    <TaskBox heading={"Available Tasks"} tasksNub={currentRaid?.task?.available_raids ?? 0} />
                    <TaskBox heading={"Completed Tasks"} tasksNub={currentRaid?.task?.completed_raids ?? 0} />
                </TaskWrapper>
            </LeftColumn>

            <RightColumn style={{ marginTop: "10px" }}>
                <TaskSub>Twitter Raiders</TaskSub>
                <Details>
                    <div>
                        <p>Task created at:</p>
                        <BoldP>{currentRaid?.task?.started_at && (new Date(currentRaid?.task?.started_at)).toUTCString()}</BoldP>
                    </div>

                    <div>
                        <p>Task to end before:</p>
                        <BoldP>{currentRaid?.task?.ended_at && (new Date(currentRaid?.task?.ended_at)).toUTCString()}</BoldP>
                    </div>

                    <div>
                        <p>Raid Link</p>
                        <Link href={formatLink(currentRaid?.task?.raid_information?.raid_link ?? "")} legacyBehavior>
                            <a style={{ color: "#f1c618", fontWeight: 500 }} target="_blank" href={formatLink(currentRaid?.task?.raid_information?.raid_link ?? "")} title={currentRaid?.task?.raid_information?.raid_link}>{(currentRaid?.task?.raid_information?.raid_link ?? "").substring(0, 20)}</a>
                        </Link>
                    </div>

                    <div>
                        <p>Action</p>
                        <BoldP>
                            {currentRaid?.task?.raid_information?.action }
                        </BoldP>
                    </div>
                </Details>
                {
                    currentRaid?.task?.raid_information.campaign_caption && (
                        <Instructions>
                                <h4>Caption</h4>
                                <div className="instruction-grid">
                                    <p>{currentRaid?.task?.raid_information?.campaign_caption}</p>
                                </div>
                        </Instructions>
                    )
                }
                {currentRaid?.task_status === RaidTaskStatus.PENDING && (
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

                        <Buttons style={{paddingTop: "20px"}}>
                            <BorderedButton type="button">Cancel</BorderedButton>
                            <ColoredButton onClick={() => handleCompleteTask({
                                raid_id: id,
                                proofs: uploadedProofs,
                            })}>Upload</ColoredButton>
                        </Buttons>
                    </UploadContainer>
                )}
            </RightColumn>
        </Wrapper>
    );
};

export default RaidDetail;
