"use client";
import {
    RightColumn,
    Task,
    Tasks,
    Wrapper,
} from "@/app/styles/task-details.styles";
import { useRaiderTaskFeature } from "@/lib/hooks/moderator/raider-task";
import { useUserStore } from "@/lib/store/user";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const RaidTaskDetailsNew = () => {
    const router = useRouter();
    const isLoaded = useRef(false);
    
    const { raiderTasks, getRaiderTasks } = useRaiderTaskFeature();
    useEffect(() => {
      if (isLoaded.current) return;
      getRaiderTasks({
          limit: 10,
          page: 1
      })
      isLoaded.current = true;
    }, [])
    
    return (
        <Wrapper>
            <RightColumn>
              
                <Tasks>
                    {raiderTasks.raider_tasks.map((task) => (<Task>
                        <div>
                            <h3>{task.raid_information.action}</h3>
                            <p className="task-text">
                                <span>Total task: </span>{task.available_raids}
                            </p>
                        </div>

                        <div className="claim">
                            <button onClick={() => router.push(`/dashboard/tasks/moderators/task/raider/${task.id}`)}>Moderate</button>
                        </div>
                    </Task>))}
                </Tasks>
            </RightColumn>
        </Wrapper>
    );
};

export default RaidTaskDetailsNew;
