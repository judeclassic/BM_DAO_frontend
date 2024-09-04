import styled from "styled-components";
import theme from "./theme";

const { colors } = theme;

export const Wrapper = styled.div`
    display: flex;
    column-gap: 1.25rem;
    padding-top: 20px;

    @media screen and (max-width: 1080px) {
        flex-direction: column;
        row-gap: 1.25rem;
        /* margin-top: 60px; */
    }
`;

export const TaskImageWrapper = styled.div`
    background-color: #f2f2f2;
    height: 100%;
    border-radius:10px;
    display: flex;
    flex-direction: column;
    row-gap: 1.25rem;
`

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.25rem;
`;
export const TaskWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 100px;
    row-gap: 1.25rem;
    @media screen and (max-width: 1080px) {
        position: static;
        flex-direction: row;
        column-gap: 1.25rem;
        overflow-x: scroll;
    }
`;

export const RightColumn = styled.div`
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    width: 100%;
    max-width: 800px;
    border-radius: 10px;
    @media screen and (max-width: 1000px) {
        max-width: none;
    }

    @media screen and (max-width: 768px) {
        padding: 10px;
    }
`;

export const TaskSub = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    @media screen and (max-width: 768px) {
        font-size: 18px;
    }
`;

export const Details = styled.div`
    font-size: 1rem;
    font-weight: 500;
    margin-top: 1.35rem;
    > div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.8rem;
    }

    @media screen and (max-width: 768px) {
        font-size: 14px;

        > div {
            flex-wrap: wrap;
        }
    }
`;

export const BoldP = styled.p`
    font-size: 1.125rem;
    font-weight: 600;

    @media screen and (max-width: 768px) {
        font-size: 14px;
    }
`;

export const Instructions = styled.div`
    > h4 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.85rem;
        margin-top: 20px;
    }

    p {
        margin-bottom: 0.25rem;
    }

    .instruction-grid {
        display: flex;
        column-gap: 6px;
    }

    @media screen and (max-width: 768px) {
        font-size: 14px;

        > h4 {
            font-size: 18px;
        }
    }
`;

export const TemplateHeading = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    margin: 1.25rem 0 0.625rem;
`;

export const TemplateBox = styled.div`
    border: 1px solid #000;
    border-radius: 0.625rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.85rem;
    padding: 0.75rem;

    p {
        font-size: 0.875rem;
    }

    @media screen and (max-width: 495px) {
        padding: 10px 8px;
    }
`;

export const Copy = styled.div`
    align-self: flex-end;
    display: flex;
    margin: 1rem;
    p {
        color: ${colors.primaryColor};
        font-style: italic;
        font-weight: 500;
    }
`;

export const UploadContainer = styled.div`
    display: flex;
    flex-direction: column;

    h4 {
        font-size: 1rem;
        font-weight: 600;
        margin: 1.25rem 0 0.85rem;
    }

    @media screen and (max-width: 495px) {
        font-size: 14px;
    }
`;

export const UploadBox = styled.div`
    align-items: center;
    border-radius: 0.625rem;
    border: 2px dashed #c4c4c4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 0;
    row-gap: 1.85rem;
`;

export const FileInput = styled.div`
    text-align: center;
    label {
        color: ${colors.primaryColor};
        font-weight: 500;
    }
`;

export const TextInput = styled.div`
    border: 1.5px solid #cacaca;
    border-radius: 0.625rem;
    display: flex;
    justify-content: space-between;
    padding: 0.7rem;
    form,
    input, select {
        width: 100%;
    }

    input, select {
        background: transparent;
        color: #cacaca;
        display: block;
        border: transparent;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        outline: none;
    }
    select {
        color: #333 !important;
    }

    input:focus {
        color: #222;
    }

    button {
        color: ${colors.primaryColor};
        font-size: 15px;
        font-weight: 500;
        border: transparent;
        background: transparent;
        outline: none;
        cursor: pointer;
    }

    button:focus,
    input:focus {
        outline: none;
    }

    @media screen and (max-width: 495px) {
        input,
        button {
            font-size: 14px;
        }
    }
`;

export const Buttons = styled.div`
    align-self: flex-end;
    display: grid;
    column-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    margin: 5rem 0 1.5rem;
    @media screen and (max-width: 495px) {
        align-self: center;
        column-gap: 8px;
        margin: 5rem 0 8px;
    }
`;

export const button = styled.button`
    border: transparent;
    border-radius: 0.625rem;
    font-size: inherit;
    font-family: inherit;
    padding: 0.65rem 2rem;

    :focus {
        outline: none;
    }

    @media screen and (max-width: 768px) {
        font-size: 14px;
    }
`;

export const ColoredButton = styled(button)`
    background-color: #fc0;
    width: 100%;
    text-overflow: wrap;
`;

export const BorderedButton = styled(button)`
    border-radius: 0.625rem;
    border: 1px solid #818181;
    padding: 0.5rem 2rem;
`;

export const StartButton = styled(button)`
    align-self: flex-end;
    background-color: #fc0;
    margin-top: 2.2rem;
`;

export const UploadedDocContainer = styled.div`
    h4 {
        font-size: 1rem;
        font-weight: 600;
        margin: 1.25rem 0 0.85rem;
    }
`;

export const ScreenshotContainer = styled.div`
    border: 2px solid #c4c4c4;
    border-radius: 0.625rem;
    column-gap: 0.625rem;
    display: flex;
    flex-wrap: wrap;
    padding: 1.06rem;
    row-gap: 0.625rem;

    > div {
        align-items: center;
        border: 1px solid #818181;
        border-radius: 1.5625rem;
        display: flex;
        justify-content: center;
        padding: 0.62rem;
        /* max-width: 13rem; */
    }

    div > p {
        margin: 0 0.8rem;
        font-weight: 500;
    }

    .hidden-desktop {
        display: none;
    }

    .uploaded-url > div {
        display: flex;
    }

    .url-wrapper h4 {
        display: none;
    }

    @media screen and (max-width: 495px) {
        border: none;
        padding: 0;

        .hidden-desktop {
            color: ${colors.primaryColor};
            display: block;
            font: inherit;
            font-weight: 600;
        }

        .url-wrapper {
            align-items: flex-start;
            border: none;
            flex-direction: column;
            width: 100%;
        }

        .url-wrapper h4 {
            display: block;
        }
        .uploaded-url {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }

        .uploaded-url > div {
            border: none;
            padding-left: 0;
        }
    }
`;

export const Username = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.625rem;
    p {
        font-size: 1rem;
        font-weight: 500;
    }

    button {
        color: ${colors.primaryColor};
        border: transparent;
        font: inherit;
        font-weight: 600;
    }

    @media screen and (max-width: 495px) {
        margin-bottom: 20px;
        padding: 0 20px;
        p,
        button {
            font-size: 14px;
        }
    }
`;

//Task Details New

export const TaskNav = styled.div`
    align-self: center;
    align-items: center;
    background: #fff1bb;
    border-radius: 0.625rem;
    display: flex;
    padding: 0.1875rem;
    text-align: center;
    width: 80%;

    @media screen and (max-width: 1000px) {
        width: 100%;
    }
`;

export const TaskNavItem = styled.div<{ isActive: boolean }>`
    background-color: ${(props) =>
        props.isActive ? colors.primaryColor : "transparent"};
    border-radius: 0.625rem;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.875rem 2rem;
    width: 100%;
    flex: 1;
    @media screen and (max-width: 536px) {
        font-size: 12px;
        padding: 10px 15px;
    }
`;

export const Tasks = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    row-gap: 0.625rem;
`;

export const Task = styled.div`
    border-radius: 0.625rem;
    border: 1px solid ${colors.lightGrey};
    column-gap: 1rem;
    display: flex;
    font-weight: 400;
    align-items: center;
    justify-content: space-between;
    padding: 0.625rem;

    h3 {
        font-size: 1.25rem;
        font-weight: 500;
    }

    p.task-text {
        font-size: 0.875rem;
        margin: 0.3125rem 0;
        max-width: 25rem;
    }

    div.reward span {
        font-weight: 500;
        margin-right: 2rem;
    }

    button {
        background-color: ${colors.primaryColor};
        border-radius: 0.625rem;
        font-family: inherit;
        font-size: 14px;
        font-weight: 500;
        padding: 8px 15px;
        width: 120px;
    }
    .claim {
        text-align: right;
    }
    @media screen and (max-width: 536px) {
        h3 {
            font-size: 16px;
        }

        p {
            font-size: 12px;
        }

        div.reward span {
            margin-right: 10px;
        }

        div.claim {
            align-self: flex-end;
        }

        button {
            font-size: 14px;
            padding: 10px 25px;
        }
    }
`;
