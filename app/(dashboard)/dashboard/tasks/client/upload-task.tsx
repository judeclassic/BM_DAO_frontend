import {
    LastItem,
    UploadContainer,
    Buttons,
    Wrapper,
} from "@/app/styles/upload-tasks.style";
import Image from "next/image";
import React, { use, useState } from "react";

import dropdon_icon from "../../../../../public/dropdown.svg";
import {
    BorderedButton,
    ColoredButton,
} from "@/app/styles/task-details.styles";
import { createRaidTask } from "@/app/api/task";
import { setLoading, useDispatch } from "@/lib/redux";
import { toast } from "react-toastify";
import { createChatTask } from "@/app/api/service";

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: boolean;
}


type ActionType = "Create a Tweet" | "Comment on Post" | "Follow Account" | "Retweet Post" | "Like Post" | "Raid";
type ChatMediaype = "Twitter" | "Facebook" | "Instagram" | "WeChat";
type ChatPerSessionType = "1" | "5" | "15" | "20";

const UploadTask: React.FC<Props> = ({ setShowModal, setRefetch, refetch }) => {
    const [taskType, setTaskType] = useState<string>("twitter-raider");
    const [raidersNumber, setRaidersNumber] = useState("");
    const [weeks, setWeeks] = useState("");
    const [dailyPost, setDailyPost] = useState("");
    const [startDate, setStartDate] = useState("");
    const [raidLink, setRaidLink] = useState("");
    const [actions, setActions] = useState<string[]>([]);
    const [action, setAction] = useState<ActionType>("Follow Account")
    const [caption, setCaption] = useState("");
    const [mediaLink, setMediaLink] = useState("");

    const [chatHourPerDay, setChatHourPerDay] = useState('1')
    const [chatDays, setChatDays] = useState('1')
    const [chatPerSession, setChatPerSession] = useState('1')
    const [chatMedia, setChatMedia] = useState('')
    const [chatStartDate, setChatStartDate] = useState('')
    const [chatCompaignCaption, setChatCompaignCaption] = useState('')
    const [chatPostLink, setChatPostLink] = useState('')

    const toggleAction = (action: string) => {
        setActions((prev) => {
            const copyOfPrev = [...prev];
            if((copyOfPrev.indexOf(action) > -1)) {
                copyOfPrev.splice(copyOfPrev.indexOf(action), 1);
            } else {
                copyOfPrev.push(action)
            }
            return copyOfPrev;
        })
    }
    const getActionStatus = (action: string) => {
        return !!(actions.indexOf(action) > -1);
    }
    const dispatch = useDispatch();

    const changeTaskType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskType(e.target.value);
    };
    
    const handleCreateTask = () => {
        if(taskType === "twitter-raider") {
            if(!raidersNumber || !raidLink || !action || !startDate) {
              toast.error("Fill in required fields", {
                position: toast.POSITION.TOP_RIGHT
              });
              return;
            }
            dispatch(setLoading(true));
            createRaidTask({
                taskType: "raider",
                numbers: raidersNumber,
                startDate: (new Date(startDate)).toISOString(),
                raidLink,
                campaignCaption: caption,
                action,
                mediaUrl: mediaLink,
            }).then((res) => {
                toast.success("Raiders task created successfully", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setShowModal(false);
                dispatch(setLoading(false));
                setRefetch(!refetch);
            }).catch((e: any) => {
                if(e?.response?.data?.error[0].message) {
                    toast.error(e?.response?.data?.error[0].message, {
                      position: toast.POSITION.TOP_RIGHT
                    });
                    dispatch(setLoading(false));
                    return
                }
                if(e?.message) {
                    toast.error(e?.message, {
                      position: toast.POSITION.TOP_RIGHT
                    });
                    dispatch(setLoading(false));
                    return
                }
                dispatch(setLoading(false));
            })
        }

        if(taskType === "chat-engager") {
            if(!chatHourPerDay || !chatDays || !chatPerSession || !chatMedia || !chatStartDate || !chatCompaignCaption || !chatPostLink) {
              toast.error("Fill in required fields", {
                position: toast.POSITION.TOP_RIGHT
              });
              return;
            }
            dispatch(setLoading(true));
            createChatTask({
                serviceType: "chatter",
                postLink: chatPostLink,
                compaignCaption: chatCompaignCaption,
                chatterPerSession: chatPerSession,
                hoursPerDay: chatHourPerDay,
                startDate: (new Date(chatStartDate)).toISOString(),
                days: chatDays,
                media: chatMedia
            }).then((res) => {
                toast.success("chatters task created successfully", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setShowModal(false);
                dispatch(setLoading(false));
                setRefetch(!refetch);
            }).catch((e: any) => {
                if(e?.response?.data?.error[0].message) {
                    toast.error(e?.response?.data?.error[0].message, {
                      position: toast.POSITION.TOP_RIGHT
                    });
                    dispatch(setLoading(false));
                    return
                }
                if(e?.message) {
                    toast.error(e?.message, {
                      position: toast.POSITION.TOP_RIGHT
                    });
                    dispatch(setLoading(false));
                    return
                }
                dispatch(setLoading(false));
            })
        }


    }

    const getPrice = (type: ActionType): number => {
        switch (type) {
            case "Comment on Post":
                return Number(raidersNumber) * 0.045
            case "Create a Tweet":
                return Number(raidersNumber) * 0.25
            case "Like Post":
                return Number(raidersNumber) * 0.01
            case "Raid":
                return Number(raidersNumber) * 0.3
            case "Follow Account":
                return Number(raidersNumber) * 0.015
            case "Retweet Post":
                return Number(raidersNumber) * 0.18
            default:
                return 0;
        }
    }

    return (
        <Wrapper>
                <UploadContainer>
                    <h3>Upload Task</h3>
                    <form>
                        <div>
                            <label htmlFor="task-type" className="full-width">
                                <h4>Task Type</h4>
                                <div className="select">
                                    <select
                                        name="task-type"
                                        id="task-type"
                                        onChange={(e) => changeTaskType(e)}
                                    >
                                        {/* <option value="collab-manager">
                                            Collab Manager
                                        </option> */}
                                        <option value="twitter-raider">
                                            Raider
                                        </option>
                                        <option value="chat-engager">
                                            Chat Engager
                                        </option>
                                        {/* <option value="moderator">
                                            Moderator
                                        </option> */}
                                    </select>
                                </div>
                            </label>
                        </div>

                        {taskType === "chat-engager" && (
                            <>
                                <div>
                                    <label htmlFor="hours-of-engagement">
                                        <h4>Hours of Engagement per day</h4>

                                        <input
                                            id="hours-of-engagement"
                                            type="number"
                                            placeholder=""
                                            min="1"
                                            value={chatHourPerDay}
                                            onChange={(e) => setChatHourPerDay(e.target.value)}
                                        />
                                    </label>

                                    <label htmlFor="campaign-day">
                                        <h4>Campaign day</h4>

                                        <input
                                            id="campaign-day"
                                            type="number"
                                            placeholder=""
                                            min="1"
                                            value={chatDays}
                                            onChange={(e) => setChatDays(e.target.value)}
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="active-chatters">
                                        <h4>Number of Active Chatters</h4>
                                        {/* <div className="select">
                                            <select
                                                name="active-chatters"
                                                id="active-chatters"
                                                value={chatPerSession}
                                                onChange={(e) => setChatPerSession(e.target.value as ChatPerSessionType)}
                                            >
                                                <option>Chat per session</option>
                                                <option value="1">1</option>
                                                <option value="2">5</option>
                                                <option value="3">15</option>
                                                <option value="4">20</option>
                                            </select>
                                            <Image
                                                src={dropdon_icon}
                                                alt="Dropdown Icon"
                                            />
                                        </div> */}
                                         <input
                                            id="campaign-day"
                                            type="number"
                                            placeholder=""
                                            min="1"
                                            value={chatPerSession}
                                            onChange={(e) => setChatPerSession(e.target.value)}
                                        />
                                    </label>

                                    <label htmlFor="social-media">
                                        <h4>Social Media</h4>
                                        <div className="select">
                                            <select
                                                name="social-media"
                                                id="social-media"
                                                value={chatMedia}
                                                // onChange={(e) => setChatMedia(e.target.value)}
                                                onChange={(e) => setChatMedia(e.target.value as ChatMediaype)}
                                            >
                                                <option>
                                                    Social media
                                                </option>
                                                <option value="Twitter">
                                                    Twitter
                                                </option>
                                                <option value="Facebook">
                                                    Facebook
                                                </option>
                                                <option value="Instagram">
                                                    Instagram
                                                </option>
                                                <option value="WeChat">
                                                    WeChat
                                                </option>
                                            </select>
                                            <Image
                                                src={dropdon_icon}
                                                alt="Dropdown Icon"
                                            />
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="start-date">
                                        <h4>Start Time</h4>

                                        <input
                                            id="start-date"
                                            type="datetime-local"
                                            placeholder=""
                                            value={chatStartDate}
                                            onChange={(e) => setChatStartDate(e.target.value)}
                                        />
                                    </label>

                                    <label htmlFor="compaignCaption">
                                        <h4>CompaignCaption</h4>

                                        <input
                                            id="compaignCaption"
                                            type="text"
                                            placeholder=""
                                            value={chatCompaignCaption}
                                            onChange={(e) => setChatCompaignCaption(e.target.value)}
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label
                                        htmlFor="community-link"
                                        className="full-width"
                                    >
                                        <h4>Community link</h4>

                                        <input
                                            id="community-link"
                                            type="text"
                                            placeholder=""
                                            value={chatPostLink}
                                            onChange={(e) => setChatPostLink(e.target.value)}
                                        />
                                    </label>
                                </div>
                            </>
                        )}

                        {taskType === "collab-manager" && (
                            <>
                                <div>
                                    <label htmlFor="no-of-collab">
                                        <h4>No of Collab per day</h4>

                                        <input
                                            id="no-of-collab"
                                            type="text"
                                            placeholder=""
                                        />
                                    </label>

                                    <label htmlFor="campaign-day">
                                        <h4>Campaign day</h4>

                                        <input
                                            id="campaign-day"
                                            type="text"
                                            placeholder=""
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label
                                        htmlFor="community-minimum"
                                        className="full-width"
                                    >
                                        <h4>Community minimum member</h4>

                                        <input
                                            id="community-link"
                                            type="text"
                                            placeholder=""
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="allow-collaboration">
                                        <h4>Allow Re-Collaboration</h4>
                                        <div className="select">
                                            <select
                                                name="allow-collaboration"
                                                id="allow-collaboration"
                                            >
                                                <option value="1">1</option>
                                                <option value="2">5</option>
                                                <option value="3">15</option>
                                                <option value="4">20</option>
                                            </select>
                                            <Image
                                                src={dropdon_icon}
                                                alt="Dropdown Icon"
                                            />
                                        </div>
                                    </label>

                                    <label htmlFor="social-media">
                                        <h4>Social Media</h4>
                                        <div className="select">
                                            <select
                                                name="social-media"
                                                id="social-media"
                                            >
                                                <option value="1">
                                                    Twitter
                                                </option>
                                                <option value="2">
                                                    Facebook
                                                </option>
                                                <option value="3">
                                                    Instagram
                                                </option>
                                                <option value="4">
                                                    WeChat
                                                </option>
                                            </select>
                                            <Image
                                                src={dropdon_icon}
                                                alt="Dropdown Icon"
                                            />
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <label
                                        htmlFor="community-link"
                                        className="full-width"
                                    >
                                        <h4>Community link</h4>

                                        <input
                                            id="community-link"
                                            type="text"
                                            placeholder=""
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label
                                        htmlFor="collab-template"
                                        className="full-width"
                                    >
                                        <h4>Your Collab Template</h4>

                                        <textarea
                                            name="collab-template"
                                            id="collab-template"
                                        />
                                    </label>
                                </div>
                            </>
                        )}

                        {taskType == "twitter-raider" && (
                            <>
                                {/* <div className="actions">
                                    <h4>Actions</h4>
                                    <div>
                                        <label htmlFor="follow-account">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="follow-account"
                                                checked={getActionStatus("Follow Account")}
                                                onChange={() => toggleAction("Follow Account")}
                                            />
                                            Follow Account
                                        </label>

                                        <label htmlFor="like-post">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="like-post"
                                                checked={getActionStatus("Like Post")}
                                                onChange={() => toggleAction("Like Post")}
                                            />
                                            Like Post
                                        </label>

                                        <label htmlFor="retweet-post">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="retweet-post"
                                                checked={getActionStatus("Retweet Post")}
                                                onChange={() => toggleAction("Retweet Post")}
                                            />
                                            Retweet Post
                                        </label>

                                        <label htmlFor="comment-on-post">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="comment-on-post"
                                                checked={getActionStatus("Comment On Post")}
                                                onChange={() => toggleAction("Comment On Post")}
                                            />
                                            Comment on Post
                                        </label>

                                         <label htmlFor="create-tweet">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="create-tweet"
                                                checked={getActionStatus("Create Tweet")}
                                                onChange={() => toggleAction("Create Tweet")}
                                            />
                                            Create Tweet
                                        </label>
                                    </div>
                                </div> */}
                                <div>
                                    <label htmlFor="" className="full-width">
                                        <h4>Actions</h4>

                                        <div className="select">
                                            <select value={action} onChange={(e) => setAction(e.target.value as ActionType)}>
                                                <option value="Follow Account">Follow Account</option>
                                                <option value="Like Post">Like Post</option>
                                                <option value="Retweet Post">Retweet Post</option>
                                                <option value="Comment on Post">Comment on Post</option>
                                                <option value="Create a Tweet">Create a Tweet</option>
                                                <option value="Raid">Raid</option>
                                            </select>
                                        </div>
                                    </label>
                                </div>
                                {/* 
                                <div>
                                    <label htmlFor="" className="full-width">
                                        <h4>No of Followers</h4>

                                        <div className="select">
                                            <select name="" id="">
                                                <option value="4">4</option>
                                                <option value="3">3</option>
                                                <option value="2">2</option>
                                                <option value="1">1</option>
                                            </select>
                                            <Image
                                                src={dropdon_icon}
                                                alt="Dropdown Icon"
                                            />
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="" className="full-width">
                                        <h4>No of Tweets</h4>

                                        <div className="select">
                                            <select name="" id="">
                                                <option value="4">4</option>
                                                <option value="3">3</option>
                                                <option value="2">2</option>
                                                <option value="1">1</option>
                                            </select>
                                            <Image
                                                src={dropdon_icon}
                                                alt="Dropdown Icon"
                                            />
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="" className="full-width">
                                        <h4>No of Likes</h4>

                                        <div className="select">
                                            <select name="" id="">
                                                <option value="4">4</option>
                                                <option value="3">3</option>
                                                <option value="2">2</option>
                                                <option value="1">1</option>
                                            </select>
                                            <Image
                                                src={dropdon_icon}
                                                alt="Dropdown Icon"
                                            />
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="" className="full-width">
                                        <h4>No of Retweets</h4>

                                        <div className="select">
                                            <select name="" id="">
                                                <option value="4">4</option>
                                                <option value="3">3</option>
                                                <option value="2">2</option>
                                                <option value="1">1</option>
                                            </select>
                                            <Image
                                                src={dropdon_icon}
                                                alt="Dropdown Icon"
                                            />
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="" className="full-width">
                                        <h4>No of Comments</h4>

                                        <div className="select">
                                            <select name="" id="">
                                                <option value="4">4</option>
                                                <option value="3">3</option>
                                                <option value="2">2</option>
                                                <option value="1">1</option>
                                            </select>
                                            <Image
                                                src={dropdon_icon}
                                                alt="Dropdown Icon"
                                            />
                                        </div>
                                    </label>
                                </div> */}
                                <div>
                                    <label htmlFor="raiders-count" className="full-width">
                                        <h4>{action === "Follow Account" ? "No of followers" : action === "Like Post" ? "No of likes" : action === "Retweet Post"? "No of retweets" : action === "Comment on Post" ? "No of comments" : action === "Create a Tweet" ? "No of tweets" : "No of raids" }</h4>
                                        <input
                                            id="raiders-count"
                                            type="text"
                                            placeholder=""
                                            value={raidersNumber}
                                            onChange={(e) => {
                                                (e.target.value === "") ? setRaidersNumber(e.target.value) : Number(e.target.value) && setRaidersNumber(e.target.value) 
                                            }}
                                        />
                                    </label>
                                    <label htmlFor="raid-start" className="full-width">
                                        <h4>Start date</h4>
                                        <input
                                            id="raid-start"
                                            type="datetime-local"
                                            placeholder=""
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="" className="full-width">
                                        <h4>Link</h4>

                                        <input
                                            id=""
                                            type="text"
                                            placeholder=""
                                            value={raidLink}
                                            onChange={(e) => setRaidLink(e.target.value)}
                                        />
                                    </label>
                                </div>
                                { ((action === "Comment on Post") || (action === "Create a Tweet") || (action === "Raid")) && <div>
                                    <label htmlFor="" className="full-width">
                                        <h4>Media URL</h4>

                                        <input
                                            id=""
                                            type="text"
                                            placeholder=""
                                            value={mediaLink}
                                            onChange={(e) => setMediaLink(e.target.value)}
                                        />
                                    </label>
                                </div>
                                }
                                {/* <div>
                                    <label htmlFor="" className="full-width">
                                        <h4>
                                            Upload the media you want to be
                                            posted
                                        </h4>
                                        <div className="input">
                                            <input
                                                id=""
                                                type="text"
                                                placeholder="Add URL"
                                            />

                                            <button type="submit">
                                                Upload
                                            </button>
                                        </div>
                                    </label>
                                </div> */}

                               { ((action === "Comment on Post") || (action === "Create a Tweet") || (action === "Raid")) && <div>
                                    <label
                                        htmlFor="campaign-caption"
                                        className="full-width"
                                    >
                                        <h4>Enter Campaign Caption</h4>

                                        <textarea
                                            name="campaign-caption"
                                            id="campaign-caption"
                                            value={caption}
                                            onChange={(e) => setCaption(e.target.value)}
                                        />
                                    </label>
                                </div>
                                }
                            </>
                        )}

                        {taskType === "moderator" && (
                            <>
                                <div>
                                    <label htmlFor="" className="full-width">
                                        <h4>Hours of Community Moderation</h4>

                                        <input
                                            id=""
                                            type="text"
                                            placeholder=""
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="" className="full-width">
                                        <h4>Campaign days</h4>

                                        <input
                                            id=""
                                            type="text"
                                            placeholder=""
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="active-chatters">
                                        <h4>Number of Active Chatters</h4>
                                        <div className="select">
                                            <select
                                                name="active-chatters"
                                                id="active-chatters"
                                            >
                                                <option value="1">1</option>
                                                <option value="2">5</option>
                                                <option value="3">15</option>
                                                <option value="4">20</option>
                                            </select>
                                            <Image
                                                src={dropdon_icon}
                                                alt="Dropdown Icon"
                                            />
                                        </div>
                                    </label>

                                    <label htmlFor="social-media">
                                        <h4>Social Media</h4>
                                        <div className="select">
                                            <select
                                                name="social-media"
                                                id="social-media"
                                            >
                                                <option value="1">
                                                    Twitter
                                                </option>
                                                <option value="2">
                                                    Facebook
                                                </option>
                                                <option value="3">
                                                    Instagram
                                                </option>
                                                <option value="4">
                                                    WeChat
                                                </option>
                                            </select>
                                            <Image
                                                src={dropdon_icon}
                                                alt="Dropdown Icon"
                                            />
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <label
                                        htmlFor="community-link"
                                        className="full-width"
                                    >
                                        <h4>Community link</h4>

                                        <input
                                            id="community-link"
                                            type="text"
                                            placeholder=""
                                        />
                                    </label>
                                </div>
                            </>
                        )}
                    </form>

                    <LastItem>
                        <div>
                            <p>Service cost</p> {taskType == "twitter-raider"? <p className="right">$ {getPrice(action)}</p> :<p className="right">${0.8 * parseFloat(chatHourPerDay) * parseFloat(chatDays) * parseFloat(chatPerSession)}</p>}
                        </div>
                    </LastItem>

                    <Buttons>
                        <BorderedButton onClick={() => setShowModal(false)}>
                            Cancel
                        </BorderedButton>
                        <ColoredButton type="submit" onClick={handleCreateTask}>Pay</ColoredButton>
                    </Buttons>
                </UploadContainer>
        </Wrapper>
    );
};

export default UploadTask;
