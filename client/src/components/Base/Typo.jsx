import styled, {css} from 'styled-components'

const generalStyle = props => `
    margin: 0;
    line-height: 1.2;
    font-weight: ${props => props.weight || "500"};
    color: ${props.theme.color.text[props.color] || props.theme.color.text.primary};
    text-align: ${props.textAlign || "left"};
`
export const H1 = styled.h1`
    ${generalStyle}
    font-size: calc(1.375rem + 1.2vw);
`
export const H2 = styled.h2`
    ${generalStyle}
    font-size: calc(1.325rem + .9vw);
`
export const H3 = styled.h3`
    ${generalStyle}
    font-size: calc(1.3rem + .6vw);
`
export const H4 = styled.h4`
    ${generalStyle}
    font-size: calc(1.275rem + .3vw);
`
export const H5 = styled.h5`
    ${generalStyle}
    font-size: 1.25rem;
`
export const H6 = styled.h6`
    ${generalStyle}
    font-size: 1.1rem;
`
export const P = styled.p`
    ${generalStyle}
    color: ${props => props.theme.color.text[props.color] || props.theme.color.text.primary};
    font-size: 1rem;
    font-weight: 400;
    ${props => props.lead && css`
        line-height: 1.5;
        font-size: 1.25rem;
        font-weight: 300;
    `}
`
const Typography = {H1, H2, H3, H4, H5, H6, P}

export default Typography