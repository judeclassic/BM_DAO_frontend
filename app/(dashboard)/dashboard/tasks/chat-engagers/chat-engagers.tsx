"use client";
import HeadingCard from "@/app/components/heading-card/heading-card";
import { Container } from "@/app/styles/dashboard.style";
import React, { useEffect, useState } from "react";
import NotRegistered from "../../../../components/not-registered/not-registered";
import TaskDetails from "./task-details";
import { getAllChatterServices } from "@/app/api/service";
import { getIsLoading, setLoading, useDispatch, useSelector } from "@/lib/redux";
import { toast } from "react-toastify";

const ChatEngagers = () => {
    const dispatch = useDispatch();
    const loading = useSelector(getIsLoading);
    const [hasChatService, setHasChatService] = useState(false);
    const fetchChatterServices = () => {
        getAllChatterServices()
        .then((res) => {
          setHasChatService(!!res.data.data.userServices.filter((s: any) => s.accountType === "moderators").length);
          dispatch(setLoading(false));
        }).catch((e: any) => {
          toast.error(e?.response?.data.error[0].message, {
            position: toast.POSITION.TOP_RIGHT
          });
          dispatch(setLoading(false));
        })
      }
    useEffect(() => {
        fetchChatterServices();
    }, [])
    return (
        <Container>
            <HeadingCard heading={"Tasks"} sub={"Chat Engagers"} />
            {
                !loading ? <TaskDetails /> : <NotRegistered taskSub={"Moderators"} update={fetchChatterServices} />
            }
        </Container>
    );
};

export default ChatEngagers;
