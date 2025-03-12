"use client";

import React, { useEffect, useRef, useState } from "react";
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
} from "../../../../../../../../../styles/task-details.styles";
import { useRaiderTaskFeature } from "@/lib/hooks/moderator/raider-task";
import { RaidTaskStatus } from "@/lib/types/raider/raid.interface";
import RaidTaskHandler from "./raid-handler";
 
interface IProps {
    id: string
}

const TaskDetails: React.FC<IProps> = ({ id }) => {
    const isLoaded = useRef("");
    const [ imageIndex, setImageIndex ] = useState(0)
    const { 
        currentTask, raids, currentRaid,
        getRaiderTask, getRaids,
        approveRaid, rejectRaid
    } = useRaiderTaskFeature();
    
    useEffect(() => {
      if (isLoaded.current === id) return;
      getRaiderTask({ task_id: id });
      getRaids({
        task_id: id,
        limit: 10,
        page: 1,
        status: RaidTaskStatus.COMPLETED
      });
      isLoaded.current = id;
    }, [ id ]);

    const handleNext = () => {
        if (!currentRaid) return;
        if (imageIndex === currentRaid?.proofs?.length - 1) return setImageIndex(0);
        setImageIndex((index) => index + 1);
    }

    const handlePrev = () => {
        if (!currentRaid) return;
        if (imageIndex === 0) return setImageIndex(currentRaid?.proofs?.length - 1);
        setImageIndex((index) => index - 1);
    }

    return (
        <Wrapper>
            {currentRaid && <>
                <LeftColumn>
                    <TaskImageWrapper style={{ marginTop: "60px", height: "100%", width: "90%" }}>
                        <img height={"100%"} width={"100%"} src={currentRaid?.proofs[imageIndex]} alt={`Image ${1}`} />
                    </TaskImageWrapper>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <StartButton onClick={handlePrev}>Prev</StartButton>
                        <StartButton onClick={handleNext}>Next</StartButton>
                    </div>
                </LeftColumn>
                <RightColumn style={{ marginTop: "10px" }}>
                        <TaskSub>Raider</TaskSub>
                        <Details>
                            <div>
                                <p>Minimum Message Count:</p>
                                <BoldP>25</BoldP>
                            </div>
                            <div>
                                <p>Task Reward:</p>
                                <BoldP>0.002</BoldP>
                            </div>
                            <div>
                                <p>Social Media:</p>
                                <BoldP>{currentTask?.raid_information?.action}</BoldP>
                            </div>
                            <div>
                                <p>Social Media Link:</p>
                                <BoldP>{currentTask?.raid_information?.raid_link}</BoldP>
                            </div>
                            <div>
                                <p>Number of uploads:</p>
                                <BoldP>{raids?.total_raids}</BoldP>
                            </div>
                            <div>
                                <p>Client’s Community Link:</p>
                                <BoldP>{currentTask?.raid_information?.raid_link}</BoldP>
                            </div>
                        </Details>
                        {currentTask?.raid_information?.campaign_caption && (
                            <Instructions>
                                <h4>Caption</h4>
                                <div className="instruction-grid">
                                    <p>{currentTask?.raid_information?.campaign_caption}</p>
                                </div>
                            </Instructions>
                        )}
                        <RaidTaskHandler />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <StartButton
                                onClick={rejectRaid}
                            >Reject</StartButton>
                            <StartButton
                                onClick={approveRaid}
                            >Accept</StartButton>
                        </div>
                    </RightColumn>
                </>}
                {!currentRaid && <>
                    <div style={{height: "100", width: "100%", backgroundColor: "#EFEFEFE"}}>
                        
                    </div>
                </>}
    </Wrapper>
    );
};

export default TaskDetails;
