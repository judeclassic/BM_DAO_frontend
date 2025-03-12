"use client";

import HeadingCard from "@/app/(routes)/dashboard/_components/heading-card/heading-card";
import { Container } from "@/app/styles/dashboard.style";
import React, { useEffect, useRef, useState } from "react";
import NotRegistered from "../../../../_components/not-registered/not-registered";
import SubscribeModeratorModal from "./create-moderator";
import ModeratorTaskDetails from "./task-details";
import { useModeratorAccountFeature } from "@/lib/hooks/moderator/account";

const Moderators = () => {
  const [ showCreateModel, setShowCreateModel ] = useState(false);
  const { isModeratorSubscribed } = useModeratorAccountFeature()
  
  return (
      <Container>
          <HeadingCard heading={"Tasks"} sub={"Twitter Moderators"} />

          {isModeratorSubscribed() &&  <ModeratorTaskDetails /> }

          {!isModeratorSubscribed() &&
              <div>
                  <NotRegistered
                      taskSub={"Twitter Moderators"}
                      onClicked={setShowCreateModel}
                  />
                  {  showCreateModel && <SubscribeModeratorModal onCancel={setShowCreateModel}/> }
              </div>
          }
      </Container>
  );
};
export default Moderators;
