import { styled } from "styled-components";
import theme from "@/app/styles/theme";
const { colors, breakpoints } = theme;

interface IContainer {
    $notShow?: boolean;
}

export const Container = styled.div<IContainer>`
    display: flex;
    justify-content: space-between;
    position: fixed;
    padding: 20px 0 10px 0;
    top: 0;
    background: ${colors.bgGrey};
    width: calc(100vw - 290px);
    z-index: 99999;
    ${breakpoints.lg} {
        padding: 20px 10px 10px 10px; 
        width: 100%;
        position: relative;
        ${({$notShow}) => $notShow ? "display: none;": ""};
    }
`;
export const Heading = styled.div`
    h1 {
        font-size: 30px;
        font-weight: 600;
        ${breakpoints.lg} {
            font-size: 22px;
        }
    }
`;
export const TimeContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 20px;
    div {
        display: flex;
        align-items: center;
        column-gap: 10px;
        min-width: 130px;
    }
    ${breakpoints.lg} {
        display: none;
    }
`;
