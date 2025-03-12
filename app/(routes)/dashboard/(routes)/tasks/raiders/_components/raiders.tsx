"use client";

import HeadingCard from "@/app/(routes)/dashboard/_components/heading-card/heading-card";
import { Container } from "@/app/styles/dashboard.style";
import React, { useEffect, useRef, useState } from "react";
import NotRegistered from "../../../../_components/not-registered/not-registered";
import TasksDetails from "./tasks-details";
import { useUserStore } from "@/lib/store/user";
import SubscribeRaiderModal from "./create-raider";
import { useRaiderTaskFeature } from "@/lib/hooks/raider/task";
import { useRaiderAccountFeature } from "@/lib/hooks/raider/account";

const Raiders = () => {
    const [ showCreateModel, setShowCreateModel ] = useState(false);
    const { isRaiderSubscribed } = useRaiderAccountFeature()
    
    return (
        <Container>
            <HeadingCard heading={"Tasks"} sub={"Twitter Raiders"} />

            {isRaiderSubscribed() &&  <TasksDetails /> }

            {!isRaiderSubscribed() &&
                <div>
                    <NotRegistered
                        taskSub={"Twitter Raiders"}
                        onClicked={setShowCreateModel}
                    />
                    {  showCreateModel && <SubscribeRaiderModal onCancel={setShowCreateModel}/> }
                </div>
            }
        </Container>
    );
};
export default Raiders;
