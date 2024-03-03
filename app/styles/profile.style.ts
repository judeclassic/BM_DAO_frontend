import { styled } from "styled-components";
import theme from "./theme";
const { colors, breakpoints } = theme;

export const Wrapper = styled.div`
    display: flex;
    column-gap: 20px;
    padding: 20px 0;
    ${breakpoints.lg} {
        flex-direction: column-reverse;
        row-gap: 20px;
    }
`;
export const Form = styled.form`
    width: calc(100% - 330px);
    max-width: 600px;
    background: ${colors.cardBg};
    padding: 30px 25px;
    border-radius: 10px;
    h3 {
        margin-bottom: 25px;
        font-weight: 600;
        font-size: 16px;
    }
    ${breakpoints.lg} {
        width: 100%;
        background: transparent;
    }
`;
export const UserSection = styled.div`
    position: relative;
    width: 310px;
    ${breakpoints.lg} {
        width: 100%;
    }
`;
export const UserWrap = styled.div`
    background: ${colors.cardBg};
    padding: 19px 15px;
    width: 100%;
    border-radius: 10px;
    position: sticky;
    top: 100px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    button {
        width: 100%;
        border-radius: 10px;
        padding: 12px 0;
        background: ${colors.primaryColor};
        outline: none;
        border: none;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
    }
    ${breakpoints.lg} {
        background: transparent;
        padding: 0;
    }
`;
export const UserCard = styled.div`
    display: flex;
    column-gap: 10px;
    align-items: center;
    ${breakpoints.lg} {
        flex-direction: column;
        justify-content: center;
        text-align: center;
        row-gap: 10px;
    }
`;
export const UserImage = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    overflow: hidden;
    border-radius: 50%;
`;
export const UserDetails = styled.div`
    h3 {
        font-size: 18px;
        font-weight: 600;
    }
    p {
        font-size: 15px;
    }
`;
export const RoleWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 20px 0;
    ${breakpoints.lg} {
        justify-content: center;
    }
`;
export const RoleCapsule = styled.span`
    display: inline-block;
    padding: 7px 10px;
    border-radius: 99px;
    background: ${colors.primaryColor}16;
    color: ${colors.primaryColor};
    font-size: 14px;
`;
export const InputFlex = styled.div`
    display: flex;
    column-gap: 10px;
    ${breakpoints.lg} {
        flex-direction: column;
    }
`;
export const TaskNav = styled.div`
    background: #fff1bb;
    border-radius: 10px;
    display: flex;
    padding: 10px;
    column-gap: 10px;
    text-align: center;
    width: 100%;
`;
export const ServiceBtn = styled.div`
    border-radius: 10px;
    padding: 10px 15px;
    background: ${colors.primaryColor};
    outline: none;
    border: none;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    margin: 0 auto;
    max-width: max-content;
`;
export const Modal = styled.div`
    height: 100dvh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
`;
export const ModalCard = styled.div`
    height: max-content;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    color: #333;
    width: 95%;
    max-width: 400px;
    max-height: 70dvh;
    overflow-y: scroll;
    .btn-wrapper {
        display: flex;
        padding: 10px 0;
        justify-content: space-between;
    }
    button {
        width: 40%;
        border-radius: 10px;
        padding: 12px 0;
        background: ${colors.primaryColor};
        outline: none;
        border: none;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
    }
`;

export const IframeModalCard = styled.div`
    height: max-content;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    color: #333;
    width: 95%;
    max-width: 800px;
    max-height: 70dvh;
    overflow-y: scroll;
    .btn-wrapper {
        display: flex;
        padding: 10px 0;
        justify-content: space-between;
    }
`;
