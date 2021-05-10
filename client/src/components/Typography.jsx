import styled, { css } from 'styled-components'
import {getFader} from '../utils/color'

const generalStyle = props => `
    margin-top: 0;
    font-weight: 500;
    line-height: 1.2;
    color: ${props.theme.color.text[props.color] || props.theme.color.text.primary};
    text-align: ${props.textAlign || "left"};
    outline: none;
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
    margin-bottom: 0.2rem;
    ${props => props.lead && css`
        line-height: 1.5;
        font-size: 1.25rem;
        font-weight: 300;
    `}
`

export const HL = styled.mark`
    padding: 0.2rem;
    background-color: ${props => props.background || getFader(props.theme.color.fill.primary)};
    color: ${props => props.color || props.theme.color.text.primary};
`
export const LI = styled.li`
    ${generalStyle}
    font-weight: 400;
`

export const UL = styled.ul`
    ${generalStyle}
    margin-left: ${props => (props.indentation ? props.indentation * 2 < 0 ? 0 : props.indentation * 2 : 0) + 2}rem;
    list-style-type: ${props => props.sub ? 'square' : 'circle'};
`
export const OL = styled.ol`
    ${generalStyle}
    margin-left: ${props => (props.indentation ? props.indentation * 2 < 0 ? 0 : props.indentation * 2 : 0) + 2}rem;
    font-weight: 400;
`

const BODY1 = styled.div`
  color: ${(props) => props.theme.color.text[props.color] || props.theme.color.text.primary};
  font-weight: ${(props) => props.weight ? props.weight : 'normal'};
  font-size: 14px;
`;

const CAPTION = styled.div`
  color: ${(props) => props.theme.color.text[props.color] || props.theme.color.text.primary};
  font-weight: ${(props) => props.weight ? props.weight : 'normal'};
  font-size: 12px
`;

const Typography = {H1, H2, H3, H4, H5, H6, P, HL, UL, OL, LI, BODY1, CAPTION}

export default Typography
