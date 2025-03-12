import styled from "styled-components";
import theme from "@/app/styles/theme";
const { colors, breakpoints } = theme;
interface IProps {
    $isActive?: boolean;
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 270px;
    min-width: 270px;
    max-width: 270px;
    padding: 30px 20px 25px 20px;
    row-gap: 5px;
    max-height: 100vh;
    overflow-y: scroll;
    border-right: 1px solid #D9D9D9;
    scrollbar-width: thin;
    scrollbar-color: ${colors.primaryColor}  ${colors.primaryColor}11;
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    &::-webkit-scrollbar {
        background-color: transparent;
        width: 3px;
    }
    ${breakpoints.lg} {
        display: none;
    }
`;
export const LogoWrapper = styled.div`
    margin-bottom: 30px;
`;
export const NavButton = styled.button<IProps>`
    padding: 10px;
    background: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${({ $isActive }) => $isActive ? "#000" : "#818181"};
    justify-content: space-between;
    &:hover {
        color: #000;
    }
    div {
        display: flex;
        align-items: center;
        column-gap: 10px;
        font-size: 16px;
        font-weight: 500;
    }
`;
export const SubNavButton = styled.button`
    display: flex;
    align-items: center;
    position: relative;
    padding: 10px 10px 10px 54px;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: ${colors.lightGrey};
    &:hover {
        text-decoration: underline;
        color: #000;
    }
    div {
        position: absolute;
        left: 20px;
        top: -26px;
    }
`;
export const SubNavWrapper = styled.div`
    margin-top: 10px;
`;
