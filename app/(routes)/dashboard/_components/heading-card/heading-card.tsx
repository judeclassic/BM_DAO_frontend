"use client"
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Container, Heading, TimeContainer } from './style';
import Image from 'next/image';
interface IProps {
    heading: string;
    sub?: string;
    notShow?: boolean;
}
const HeadingCard: FunctionComponent<IProps> = ({ heading, sub, notShow }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  let intervalId: NodeJS.Timer;
  useEffect(() => {
    intervalId = setInterval(() => {
        setDate((new Date()).toDateString());
        setTime((new Date()).toTimeString().split(" ")[0])
    }, 1000)
    return () => {
        clearInterval(intervalId);
    }
  }, [])
  return (
    <Container $notShow={notShow}>
        <Heading>
            <h1>{heading}</h1>
            <p>{sub}</p>
        </Heading>
        <TimeContainer>
            <div>
                <Image src={"/calendar.svg"} alt="logo" height={24} width={24} />
                <span>{date}</span>
            </div>
            <div>
                <Image src={"/time.svg"} alt="logo" height={24} width={24} />
                <span>{time}</span>
            </div>
        </TimeContainer>
    </Container>
  )
}

export default HeadingCard