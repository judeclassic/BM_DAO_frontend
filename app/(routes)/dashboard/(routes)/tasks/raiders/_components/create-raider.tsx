import { InputWrapper, InputContainer } from "@/app/styles/auth.style"
import { Modal, ModalCard } from "@/app/styles/profile.style"
import { useRaiderAccountFeature } from "@/lib/hooks/raider/account"
import { IRaiderSocials } from "@/lib/types/raider/raider.interface"
import { useForm } from "react-hook-form"

const SubscribeRaiderModal = ({ onCancel } : { onCancel: (status: boolean) => void}) => {
    const { subscribeRaiderAccount, raiderAccount } = useRaiderAccountFeature()

    const form = useForm<IRaiderSocials>({ defaultValues: {
        twitter: raiderAccount?.social_handles?.twitter ?? "",
        reddit: raiderAccount?.social_handles?.reddit ?? "",
        tiktok: raiderAccount?.social_handles?.tiktok ?? "",
        instagram: raiderAccount?.social_handles?.instagram ?? "",
        telegram: raiderAccount?.social_handles?.telegram ?? "",
        thread: raiderAccount?.social_handles?.thread ?? "",
        discord: raiderAccount?.social_handles?.discord ?? "",
        youtube: raiderAccount?.social_handles?.youtube ?? "",
    }});

    return (
        <Modal>
            <ModalCard>
                <form onSubmit={form.handleSubmit(subscribeRaiderAccount)}>
                    <p>You are about to subscribe for a raider account package for $10</p>
                        <div style={{ display: "flex", flexDirection: "column", margin: "20px 0", textAlign: "left" }}>
                        <InputWrapper>
                            <label>Twitter</label>
                            <InputContainer>
                            <input type="text" {...form.register("twitter")} placeholder="Enter your twitter handle"/>
                            </InputContainer>
                        </InputWrapper>
                        <InputWrapper>
                            <label>Instagram</label>
                            <InputContainer>
                            <input type="text" {...form.register("instagram")} placeholder="Enter your instagram handle"/>
                            </InputContainer>
                        </InputWrapper>
                        <InputWrapper>
                            <label>TikTok</label>
                            <InputContainer>
                            <input type="text" {...form.register("tiktok")} placeholder="Enter your tiktok handle"/>
                            </InputContainer>
                        </InputWrapper>
                        <InputWrapper>
                            <label>Reddit</label>
                            <InputContainer>
                            <input type="text" {...form.register("reddit")} placeholder="Enter your reddit handle"/>
                            </InputContainer>
                        </InputWrapper>
                        <InputWrapper>
                            <label>Thread</label>
                            <InputContainer>
                            <input type="text" {...form.register("thread")} placeholder="Enter your thread handle"/>
                            </InputContainer>
                        </InputWrapper>
                        <InputWrapper>
                            <label>Telegram</label>
                            <InputContainer>
                            <input type="text" {...form.register("telegram")} placeholder="Enter your telegram handle"/>
                            </InputContainer>
                        </InputWrapper>
                        <InputWrapper>
                            <label>Discord</label>
                            <InputContainer>
                            <input type="text" {...form.register("discord")} placeholder="Enter your discord handle"/>
                            </InputContainer>
                        </InputWrapper>
                        <InputWrapper>
                            <label>Youtube</label>
                            <InputContainer>
                            <input type="text" {...form.register("youtube")} placeholder="Enter your youtube handle"/>
                            </InputContainer>
                        </InputWrapper>
                        </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px" }}>
                        <button type="button" onClick={() => onCancel(false)}>Cancel</button>
                        <button>Confirm</button>
                    </div>
                </form>
            </ModalCard>
        </Modal>
    )
}

export default SubscribeRaiderModal;