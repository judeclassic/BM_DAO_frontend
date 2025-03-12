import {
    Button,
    ImageHolder,
    Text,
    Wrapper,
} from "@/app/(routes)/dashboard/_components/not-registered/not-registered.styles";
import Image from "next/image";
import React, { useState } from "react";

import image from "../../../../../public/not-registered.png";

interface Props {
    taskSub: string;
    onClicked: (showModal: boolean) => void;
}

const NotRegistered: React.FC<Props> = ({ taskSub, onClicked }) => {
    return (
        <Wrapper>
            <ImageHolder>
                <Image src={image} alt="" />
            </ImageHolder>
            <Text>
                Register as a <span>{taskSub}</span> to have access to this
                Dashboard
            </Text>
            <Button onClick={() => onClicked(true)}>Subscribe Now</Button>
        </Wrapper>
    );
};

export default NotRegistered;
