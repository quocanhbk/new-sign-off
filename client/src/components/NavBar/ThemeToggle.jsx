/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components'

const Icon = styled.div`
    color: ${props => props.theme.color.background.primary};
    display: flex;
    align-items: center;
`

const LabelToggle = styled.label`
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    padding: 4px 8px 4px 0;
    pointer-events: ${props => props.displayMode !== "edit" ? "none" : "auto"};
`;
const ToggleSpan = styled.span`
    position: relative;
    display:block;
    width: 3rem;
    height: 1.4rem;
`;
const StyleInput = styled.input`
    display: none;
    &:checked + .toggle-switch:before{
        transform: translateX(1.6rem);
    }
    &:checked ~ .toggle-switch{
        transition: 0.4s;
    }
`;
//the toggle
const StyleSpan = styled.span`
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.3rem;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.color.fill.primary};
    transition: .4s;
    border-radius: 999px;
    box-shadow: ${props => props.theme.shadow};
    //overflow: hidden;

    //the dotted
    &:before{
        position: absolute;
        content: "";
        height: 1.6rem;
        width: 1.6rem;
        top: -0.1rem;
        left: -0.1rem;
        border-radius:999px;
        bottom: 0.05rem;
        background-color: ${props => props.theme.color.background.primary};
        box-shadow: 0px 0px 4px rgba(0,0,0,0.64);
        -webkit-transition: .4s;
        transition: .4s;
    }
`;
const LightIcon = () => 
    <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun-fill" viewBox="0 0 16 16">
            <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
        </svg>
    </Icon>
const DarkIcon = () => 
    <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-fill" viewBox="0 0 16 16">
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
        </svg>
    </Icon>
const ThemeToggle = (props) => {

    const handleSelect = (e) => {
        props.onSelect(e.target.checked)
    }

    return(  
        <LabelToggle {...props}>
            <ToggleSpan>
                <StyleInput
                type="checkbox"
                name={props.name} 
                checked={props.value}
                onChange={handleSelect} 
                />
                <StyleSpan className="toggle-switch">
                    <DarkIcon/>
                    <LightIcon/>
                </StyleSpan>
            </ToggleSpan>
        </LabelToggle>
    )
}
ThemeToggle.propTypes = {
    disabled:PropTypes.bool,
    default:PropTypes.bool,
    className: PropTypes.string,
    onSelect: PropTypes.func,
    name:PropTypes.string,
    displayMode: PropTypes.oneOf(["edit", "view", "disabled"]),
    theme:PropTypes.string
}
ThemeToggle.defaultProps = {
    onSelect: (x) => {},
    default: false,
    displayMode: "edit",
    disabled:false
}

export default ThemeToggle;
