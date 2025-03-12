import theme from "@/app/styles/theme";
import { styled } from "styled-components";
const { colors, sizes, breakpoints } = theme;

export const Container = styled.div`
    background: ${colors.bgGrey};
    padding: 60px 0;
`;
export const Wrapper = styled.div`
    width: 92%;
    max-width: ${sizes.wrapperWidth};
    margin: 0 auto;
`;
export const Top = styled.div`
    display: flex;
    justify-content: space-between;
    ${breakpoints.sm} {
       flex-direction: column;
       row-gap: 20px;
    }
`; 
export const Bottom = styled.div`
    margin-top: 30px;
    p {
        text-align: center;
        font-weight: 500;
        font-size: 14px
    }
`;
export const Section = styled.div`
    h3 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 15px;
    }
    a {
        font-size: 16px;
        font-weight: 500; 
    }
    ul {
        list-style: none;
        li {
            margin: 5px 0;
        }
    }
    ${breakpoints.sm} {
       a {
        font-size: 14px;
       }
    }
`;
export const Logo = styled.div`
`;
export const SectionWrapper = styled.div`
    display: flex;
    column-gap: 100px;
    ${breakpoints.sm} {
      flex-direction: column;
      row-gap: 20px;
    }
`;
