import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components'
import {getFader} from '../utils/color'

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
    width: 2.2rem;
    height: 1.24rem;
`;
const StyleInput = styled.input`
    display: none;
    &:checked + .toggle-switch:before{
        transform: translateX(0.96rem);
    }
    &:checked ~ .toggle-switch{
        transition: 0.4s;
        background: ${props => props.displayMode === "disabled" ? props.theme.color.fill.disabled : props.theme.color.fill.primary};
    }
`;
//the toggle
const StyleSpan = styled.span`
    display:block;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.displayMode === "disabled" ? props.theme.color.fill.disabled : getFader(props.theme.color.fill.primary, 0.4)};
    transition: .4s;
    border-radius: 999px;
    box-shadow: ${props => props.theme.shadow};
    overflow: hidden;

    //the dotted
    &:before{
        position: absolute;
        content: "";
        height: 1.1rem;
        width: 1.1rem;
        left: 0.07rem;
        border-radius:50%;
        bottom: 0.07rem;
        background-color: ${props => props.theme.color.background.primary};
        box-shadow: 0px 0px 4px rgba(0,0,0,0.64);
        -webkit-transition: .4s;
        transition: .4s;
    }
`;
const StyleName= styled.span`
    user-select: none;
    font-size:1rem;
    display:inline-block;
    padding: 0px 8px;
    color: ${props => props.displayMode === "disabled" ? props.theme.color.text.disabled: props.theme.color.text.primary};
`;
const Toggle = (props) => {

    const handleSelect = (e) => {
        props.onSelect(e.target.checked)
    }

    return(  
        <LabelToggle {...props} displayMode={props.disabled ? "disabled" : props.displayMode}>
            <ToggleSpan>
                <StyleInput  displayMode={props.disabled ? "disabled" : props.displayMode} 
                type="checkbox"
                name={props.name} 
                value={props.value} 
                onChange={handleSelect} 
                defaultChecked={props.default}
                />
                <StyleSpan displayMode={props.disabled ? "disabled" : props.displayMode} className="toggle-switch"/>
            </ToggleSpan>
            <StyleName displayMode={props.disabled ? "disabled" : props.displayMode}>{props.children}</StyleName>
        </LabelToggle>
        

    )
}
Toggle.propTypes = {
    disabled:PropTypes.bool,
    default:PropTypes.bool,
    className: PropTypes.string,
    onSelect: PropTypes.func,
    name:PropTypes.string,
    displayMode: PropTypes.oneOf(["edit", "view", "disabled"]),
    theme:PropTypes.string,
    value: PropTypes.bool,
    children: PropTypes.any
}
Toggle.defaultProps = {
    onSelect: () => {},
    default: false,
    displayMode: "edit",
    disabled:false,
}

export default Toggle;
