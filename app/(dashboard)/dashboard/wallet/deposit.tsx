import {
    LastItem,
    UploadContainer,
    Buttons,
    Wrapper,
} from "@/app/styles/upload-tasks.style";
import Image from "next/image";
import React, { use, useState } from "react";
import {
    BorderedButton,
    ColoredButton,
} from "@/app/styles/task-details.styles";
import { setLoading, useDispatch } from "@/lib/redux";
import { toast } from "react-toastify";
import { deposit } from "@/app/api/service";


interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: boolean;
}


type ActionType = "Create a Tweet" | "Comment on Post" | "Follow Account" | "Retweet Post" | "Like Post" | "Raid";
type ChatMediaype = "Twitter" | "Facebook" | "Instagram" | "WeChat";
type ChatPerSessionType = "1" | "5" | "15" | "20";

const DepositeTask: React.FC<Props> = ({ setShowModal, setRefetch, refetch }) => {
   
    const dispatch = useDispatch();

    const  [amount, setAmount] = useState('')
  
    const handledeposite = () => {

        if(!amount) {
            toast.error("Enter amount", {
              position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        dispatch(setLoading(true));

        deposit({
            amount: parseFloat(amount),
        }).then((res) => {
            toast.success("wallet founded successfully", {
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



    return (
        <Wrapper>
                <UploadContainer>
                    <h3>Deposit</h3>
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
                    </form>
                    <LastItem>
                        <div>
                            
                        </div>
                    </LastItem>

                    <Buttons>
                        <BorderedButton onClick={() => setShowModal(false)}>
                            Cancel
                        </BorderedButton>
                        <ColoredButton type="submit" onClick={handledeposite}>Deposit</ColoredButton>
                    </Buttons>
                </UploadContainer>
        </Wrapper>
    );
};

export default DepositeTask;
