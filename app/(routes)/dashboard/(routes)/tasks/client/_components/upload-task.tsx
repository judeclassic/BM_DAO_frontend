import {
    LastItem,
    UploadContainer,
    Buttons,
    Wrapper,
} from "@/app/styles/upload-tasks.style";
import React from "react";
import {
    BorderedButton,
    ColoredButton,
} from "@/app/styles/task-details.styles";
import { useForm } from "react-hook-form";
import { ICreateRaidTask, RaidActionEnum, TaskPriorityEnum } from "@/lib/types/raider/task.interface";
import { useClientRaiderTaskFeature } from "@/lib/hooks/client/raider-task";

interface Props {
    setShowModal: (status: any) => void;
}

type ActionType = "Create a Tweet" | "Comment on Post" | "Follow Account" | "Retweet Post" | "Like Post" | "Raid";

const UploadTask: React.FC<Props> = ({ setShowModal }) => {
    const { createTask } = useClientRaiderTaskFeature();

    const form = useForm<ICreateRaidTask>({
        defaultValues: {
            total_raids: 20,
            raid_information: {
                action: RaidActionEnum.COMMENT,
                raid_link: "",
                campaign_caption: "",
            },
            level: TaskPriorityEnum.LOW,
            start_time: new Date(),
            end_time: new Date()
        }
    })

    return (
        <Wrapper>
            <UploadContainer>
                <form onSubmit={form.handleSubmit(createTask)}>
                    <h3>Upload Task</h3>
                    <div>
                        <label htmlFor="" className="full-width">
                            <h4>Actions</h4>

                            <div className="select">
                                <select { ...form.register('raid_information.action')} >
                                    {Object.values(RaidActionEnum).map((action) => 
                                        <option value={action}>{ action }</option>
                                    )}
                                </select>
                            </div>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="raiders-count" className="full-width">
                            <h4>
                                {"No of raids"}
                            </h4>
                            <input
                                type="number"
                                placeholder=""
                                {...form.register('total_raids')}
                            />
                        </label>
                        <label htmlFor="raid-start" className="full-width">
                            <h4>Start date</h4>
                            <input
                                type="date"
                                placeholder=""
                                {...form.register('start_time')}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="" className="full-width">
                            <h4>Media URL</h4>

                            <input
                                id=""
                                type="text"
                                placeholder=""
                                {...form.register('raid_information.raid_link')}
                            />
                        </label>
                    </div>

                    <div>
                        <label
                            htmlFor="campaign-caption"
                            className="full-width"
                        >
                            <h4>Enter Campaign Caption</h4>

                            <textarea
                                id="campaign-caption"
                                {...form.register('raid_information.campaign_caption')}
                            />
                        </label>
                    </div>

                    <LastItem>
                        <div>
                            <p>Service cost</p> :<p className="right">${ 0.8 * form.getValues('total_raids') }</p>
                        </div>
                    </LastItem>

                    <Buttons>
                        <BorderedButton type="button" onClick={() => setShowModal(false)}>
                            Cancel
                        </BorderedButton>
                        <ColoredButton type="submit">Pay</ColoredButton>
                    </Buttons>
                </form>
            </UploadContainer>
        </Wrapper>
    );
};

export default UploadTask;
