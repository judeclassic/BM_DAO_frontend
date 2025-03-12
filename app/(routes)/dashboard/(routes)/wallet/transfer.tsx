import {
    LastItem,
    UploadContainer,
    Buttons,
    Wrapper,
} from "@/app/styles/upload-tasks.style";
import React, { useState } from "react";
import {
    BorderedButton,
    ColoredButton,
} from "@/app/styles/task-details.styles";
import { toast } from "react-toastify";
import { useUserStore } from "@/lib/store/user";

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: boolean;
}


type ActionType = "Create a Tweet" | "Comment on Post" | "Follow Account" | "Retweet Post" | "Like Post" | "Raid";
type ChatMediaype = "Twitter" | "Facebook" | "Instagram" | "WeChat";
type ChatPerSessionType = "1" | "5" | "15" | "20";

const TransferTask: React.FC<Props> = ({ setShowModal, setRefetch, refetch }) => {
   
    const { setLoading } = useUserStore();

    const  [amount, setAmount] = useState('')
    const  [address, setAddress] = useState('')
  
    const handleTransfer = () => {
        if(!amount || !address) {
            toast.error("Fill all input", {
              position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        setLoading(true);

        // transfer({
        //     amount: parseFloat(amount),
        //     address: address
        // }).then((res) => {
        //     toast.success("Transaction in Progress", {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        //     setShowModal(false);
        //     dispatch(setLoading(false));
        //     setRefetch(!refetch);
        // }).catch((e: any) => {
        //     if(e?.response?.data?.error[0].message) {
        //         toast.error(e?.response?.data?.error[0].message, {
        //             position: toast.POSITION.TOP_RIGHT
        //         });
        //         dispatch(setLoading(false));
        //         return
        //     }
        //     if(e?.message) {
        //         toast.error(e?.message, {
        //             position: toast.POSITION.TOP_RIGHT
        //         });
        //         dispatch(setLoading(false));
        //         return
        //     }
        //     dispatch(setLoading(false));
        // })

    }



    return (
        <Wrapper>
                <UploadContainer>
                    <h3>Transfer</h3>
                    <form>                     
                        <div>
                            <label
                                htmlFor="community-link"
                                className="full-width"
                            >
                                <h4>amount</h4>

                                <input
                                    id="community-link"
                                    type="number"
                                    placeholder=""
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </label>
                        </div>       
                        <div>
                            <label
                                htmlFor="community-link"
                                className="full-width"
                            >
                                <h4>address</h4>

                                <input
                                    id="community-link"
                                    type="text"
                                    placeholder=""
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </label>
                        </div>                       
                    </form>
                    <LastItem>
                        <div>
                            
                        </div>
                    </LastItem>

                    <Buttons>
                        <BorderedButton onClick={() => setShowModal(false)}>
                            Cancel
                        </BorderedButton>
                        <ColoredButton type="submit" onClick={handleTransfer}>Transfer</ColoredButton>
                    </Buttons>
                </UploadContainer>
        </Wrapper>
    );
};

export default TransferTask;
