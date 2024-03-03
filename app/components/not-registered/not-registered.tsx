import {
    Button,
    ImageHolder,
    Text,
    Wrapper,
} from "@/app/components/not-registered/not-registered.styles";
import Image from "next/image";
import React, { useState } from "react";

import image from "../../../public/not-registered.png";
import { subscribeToServiceModerator, subscribeToServiceRaider , subscribeToServiceChatter } from "@/app/api/service";
import { Modal, ModalCard } from "@/app/styles/profile.style";
import { InputContainer, InputWrapper } from "@/app/styles/auth.style";

interface Props {
    taskSub: string;
    update: () => void;
}

const NotRegistered: React.FC<Props> = ({ taskSub, update }) => {
    const [showModal, setShowModal] = useState(false);
    const [twitter, setTwitter] = useState("");
    const [youtube, setYoutube] = useState("");
    const [reddit, setReddit] = useState("");
    const [discord, setDiscord] = useState("");
    const [instagram, setInstagram] = useState("");
    const [thread, setThread] = useState("");
    const [telegram, setTelegram] = useState("");
    const [tiktok, setTiktok] = useState("");
   
    const handleSubscribeToService = () => {
        if(taskSub === "Twitter Raiders") {
            subscribeToServiceRaider({
                accountType: "raider",
                handles: {
                    twitter,
                    reddit,
                    tiktok,
                    instagram,
                    telegram,
                    thread,
                    discord,
                    youtube,
                }
            })
            .then(() => {
                update();
                setShowModal(false);
            })
            .catch((e) => {
                console.log(e)
            })
        }
        if(taskSub === "Moderators") {
            subscribeToServiceModerator({
                accountType: "moderator"
            })
            .then(() => {
                update();
                setShowModal(false);
            })
            .catch((e) => {
                console.log(e)
            })
        }
        if(taskSub === "Chatters") {
          subscribeToServiceChatter({
              accountType: "chatter"
          })
          .then(() => {
              update();
              setShowModal(false);
          })
          .catch((e) => {
              console.log(e)
          })
      }
    }
    return (
        <Wrapper>
            <ImageHolder>
                <Image src={image} alt="" />
            </ImageHolder>
            <Text>
                Register as a <span>{taskSub}</span> to have access to this
                Dashboard
            </Text>
            <Button onClick={() => setShowModal(true)}>Register</Button>
            {
                showModal &&
                (<Modal>
                    <ModalCard>
                        <p>You are about to subscribe for a {(taskSub === "Twitter Raiders") && "raid"} {(taskSub === "Moderators") && "moderator"} package for $10</p>
                        {
                          taskSub === "Twitter Raiders" && (
                          <div style={{ display: "flex", flexDirection: "column", margin: "20px 0", textAlign: "left" }}>
                            <InputWrapper>
                              <label>Twitter</label>
                              <InputContainer>
                                <input type="text" value={twitter}  onChange={(e) => setTwitter(e.target.value)} placeholder="Enter your twitter handle"/>
                              </InputContainer>
                            </InputWrapper>
                            <InputWrapper>
                              <label>Instagram</label>
                              <InputContainer>
                                <input type="text" value={instagram}  onChange={(e) => setInstagram(e.target.value)} placeholder="Enter your instagram handle"/>
                              </InputContainer>
                            </InputWrapper>
                            <InputWrapper>
                              <label>TikTok</label>
                              <InputContainer>
                                <input type="text" value={tiktok}  onChange={(e) => setTiktok(e.target.value)} placeholder="Enter your tiktok handle"/>
                              </InputContainer>
                            </InputWrapper>
                            <InputWrapper>
                              <label>Reddit</label>
                              <InputContainer>
                                <input type="text" value={reddit}  onChange={(e) => setReddit(e.target.value)} placeholder="Enter your reddit handle"/>
                              </InputContainer>
                            </InputWrapper>
                            <InputWrapper>
                              <label>Thread</label>
                              <InputContainer>
                                <input type="text" value={thread}  onChange={(e) => setThread(e.target.value)} placeholder="Enter your thread handle"/>
                              </InputContainer>
                            </InputWrapper>
                            <InputWrapper>
                              <label>Telegram</label>
                              <InputContainer>
                                <input type="text" value={telegram}  onChange={(e) => setTelegram(e.target.value)} placeholder="Enter your telegram handle"/>
                              </InputContainer>
                            </InputWrapper>
                            <InputWrapper>
                              <label>Discord</label>
                              <InputContainer>
                                <input type="text" value={discord}  onChange={(e) => setDiscord(e.target.value)} placeholder="Enter your discord handle"/>
                              </InputContainer>
                            </InputWrapper>
                            <InputWrapper>
                              <label>Youtube</label>
                              <InputContainer>
                                <input type="text" value={youtube}  onChange={(e) => setYoutube(e.target.value)} placeholder="Enter your youtube handle"/>
                              </InputContainer>
                            </InputWrapper>
                          </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px" }}>
                          <button onClick={() => setShowModal(false)}>Cancel</button>
                          <button onClick={handleSubscribeToService}>Confirm</button>
                        </div>
                    </ModalCard>
                </Modal>)
            }
        </Wrapper>
    );
};

export default NotRegistered;
