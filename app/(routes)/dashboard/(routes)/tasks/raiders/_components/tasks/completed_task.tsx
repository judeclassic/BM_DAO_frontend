"use client";
import {
    Task,
    Tasks,
} from "@/app/styles/task-details.styles";
import { useRaiderTaskFeature } from "@/lib/hooks/raider/task";
import { RaidTaskStatus } from "@/lib/types/raider/raid.interface";
import React, { useEffect, useRef } from "react";

const CompletedTaskDetails = () => {
    const isLoaded = useRef(false);
    const { raids, getRaids } = useRaiderTaskFeature();

    useEffect(() => {
        if (isLoaded.current) return;
        getRaids({ status: RaidTaskStatus.COMPLETED, page: 1, limit: 10 });
        isLoaded.current = true;
    }, []);
    
    return (
        <Tasks>
            { raids?.raids?.map((raid) => (
                    <Task key={raid.id}>
                        <div>
                            <h3>{raid?.task?.raid_information?.action}</h3>
                            <p className="task-text">
                                <span>Task status: </span>{raid?.task_status}
                            </p>
                            <div className="reward">
                                <p>
                                    <span>Task timeline: </span>
                                    { raid?.timeline }
                                </p>
                            </div>
                        </div>
                    </Task>
                ))
            }
        </Tasks>
    );
};

export default CompletedTaskDetails;
