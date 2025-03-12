"use client";
import {
    Task,
    Tasks,
} from "@/app/styles/task-details.styles";
import { useRaiderTaskFeature } from "@/lib/hooks/raider/task";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const AvailableTaskDetails = () => {
    const isLoaded = useRef(false);
    const { raiderTasks, getRaiderTasks } = useRaiderTaskFeature();

    useEffect(() => {
        if (isLoaded.current) return;
        getRaiderTasks({ limit: 10, page: 1 })
        isLoaded.current = true;
    }, []);
    
    return (
        <Tasks>
            { raiderTasks?.raider_tasks?.map((task) => (
                    <Task>
                        <div>
                            <h3>{task?.raid_information?.action}</h3>
                            <p className="task-text">
                                {task?.raid_information?.campaign_caption}
                            </p>
                            <div>
                                <p>
                                    <span>Raiders needed: </span>{task?.total_raids}
                                </p>
                                <p>
                                    <span>Remaining slot: </span>{task?.available_raids}
                                </p>
                            </div>
                        </div>

                        <div className="claim">
                            <button><Link href={`/dashboard/tasks/raiders/${task?.id}`} style={{ marginBottom: "5px" }}>Claim</Link></button>
                            <p>Reward: <span style={{ fontWeight: "600" }}>
                                {/* ${getActionReward(task?.raidInformation?.action)} */}
                            </span></p>
                        </div>
                    </Task>
                ))}
        </Tasks>
    );
};

export default AvailableTaskDetails;
