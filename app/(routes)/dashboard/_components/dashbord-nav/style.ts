import theme from "@/app/styles/theme";
import Link from "next/link";
import { styled } from "styled-components";
interface INavProps {
    $isScrolled: boolean;
}
interface ILink {
    $isActive?: boolean;
}

const { sizes, colors, breakpoints } = theme;

export const Container = styled.div<INavProps>`
    height: 80px;
    width: 100%;
    position: fixed;
    top: 0;
    display: none;
    align-items: center;
    justify-content: center;
    background: ${({$isScrolled}) => $isScrolled ? colors.bgGrey : "transparent"};
    z-index: 999999;
    ${breakpoints.lg} {
        background: ${colors.bgGrey};
        display: flex;
    }
`;
export const Wrapper = styled.div`
    width: 92%;
    max-width: ${sizes.wrapperWidth};
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav-btn {
        background: transparent;
        border: none;
        outline: none;
        display: none;
        cursor: pointer;
        ${breakpoints.lg} {
            display: block;
        }
    }
`;
export const Logo = styled.div`
`;
export const Links = styled.div`
    display: flex;
    column-gap: 20px;
    font-size: 16px;
    a {
        font-size: 16px;
        font-weight: 500;
    }
    a:hover {
        color: ${colors.black};
    }
    ${breakpoints.lg} {
        display: none;
    }
`;
export const NavButton = styled.button<ILink>`
    padding: 10px;
    background: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${({ $isActive }) => $isActive ? "#000" : "#818181"};
    justify-content: space-between;
    border-radius: 5px;
    &:hover {
        color: #000;
        background: ${colors.primaryColor};
    }
    div {
        display: flex;
        align-items: center;
        column-gap: 10px;
        font-size: 16px;
        font-weight: 500;
    }
`;
export const Auth = styled.div`
    display: flex;
    column-gap: 20px;
    a {
        font-weight: 500;
        border: 1px solid ${colors.primaryColor};
        border-radius: 5px;
        padding: 5px 10px;
        display: inline-block;
    }
    a:first-of-type {
        color: ${colors.primaryColor};
    }
    a:last-of-type {
        background: ${colors.primaryColor};
        color: ${colors.black};
    }
    ${breakpoints.lg} {
        display: none;
    }
`;
export const Dropdown = styled.div`
    display: none;
    width: 100%;
    position: absolute;
    top: 80px;
    left: 0;
    background: ${colors.bgGrey};
    height: calc(100vh - 80px);
    min-height: calc(100vh - 80px);
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    padding: 20px 54px;
    overflow-y: scroll;
    ${breakpoints.lg} {
        display: flex;
    }
`;
export const MLinks = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    row-gap: 4px;
    a {
        font-size: 16px;
        font-weight: 500;
    }
    a:hover {
        color: ${colors.black};
    }
`;
export const MAuth = styled.div`
    display: flex;
    row-gap: 20px;
    flex-direction: column;
    width: 100%;
    left: 0;
    padding: 0 60px;
    position: fixed;
    bottom: 20px;
    a {
        font-weight: 500;
        border: 1px solid ${colors.primaryColor};
        border-radius: 5px;
        padding: 8px 10px;
        width: 100%;
        display: block;
    }
    a:first-of-type {
        color: ${colors.primaryColor};
    }
    a:last-of-type {
        background: ${colors.primaryColor};
        color: ${colors.black};
    }
`;
