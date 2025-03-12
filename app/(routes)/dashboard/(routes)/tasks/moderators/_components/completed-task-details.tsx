"use client"
import React, {useState} from 'react'
import {
    LeftColumn,
    RightColumn,
    Task,
    TaskNav,
    TaskNavItem,
    TaskWrapper,
    Tasks,
    Wrapper,
} from "@/app/styles/task-details.styles";


export const CompletedTaskDetails = () => {
  const [ completedRaids, setCompletedRaids ] = useState([1,2,3,4,5])
  return (
   <Wrapper>
    <RightColumn>        
      <Tasks>
      {
       completedRaids?.map((task: any) => (
         <Task>
            <div>
                <h3>raid</h3>
                <p className="task-text">
                    25 messages
                </p>
                <div className="reward">
                    <p>
                        <span>Completed raids: </span>20$
                    </p>
                </div>
            </div>
         </Task>
       ))
      }
      </Tasks>
    </RightColumn>
   </Wrapper>
  );
};
