import styled from 'styled-components'
import PropTypes from "prop-types"
import React, { useState, useEffect } from 'react';

const Container = styled.div`
    height: ${props => props.fullHeight ? "100%" : props.height ? props.height : "auto"};
    display: flex;
    flex-direction: column;    
`;
const DivTab = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    padding: 1rem;
`;
const ButtonTab=styled.button`
    display:block;
    position:relative;
    border:0;
    border-radius:0;
    cursor: pointer;
    width:100%;
    outline: none;
    padding: 1rem;
    font-size:1rem;
    text-transform: uppercase;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    font-weight: bold;
    color:${props => props.theme.color.text.primary};
    background: transparent;
    transition: .4s all;
    background-color: ${props => props.theme.color.border.primary};
    border-radius: 1rem 1rem 0 0;
    &:disabled {
        color: ${props => props.theme.color.text.disabled};
    }
    &.active{
        background: ${props => props.theme.color.text.secondary};
        color: ${props => props.theme.color.border.primary};

        transition: .4s all;
    }
`;
const TabContent=styled.div`
    height: 100%;
    padding: 1rem 0;
    background: ${props => props.theme.color.background.secondary};
`;

const Tab = (props) => {
    const [tabs,SetTabs]= useState((props.children.find(child => child.props.selected) || props.children.find(child => !child.props.disabled)).props.value)
    const [index, setIndex] = useState(0)
    const selectTab = (value) => {
        if (props.children.find(child => child.props.value === value).props.disabled)
            return
        SetTabs(value)
    }
    useEffect(() => {
        setIndex(props.children.map(child => child.props.value).indexOf(tabs))
    }, [setIndex, props.children, tabs])

    return(
        <Container {...props}>
            <DivTab  {...props}>
                {props.children.map((tab) => (
                    <ButtonTab className={`${tab.props.value==index + 1 ? "active" : ""}`} onClick={() => selectTab(tab.props.value)} key={tab.props.value} disabled={tab.props.disabled}>
                        {tab.props.name}
                    </ButtonTab>
                ))}
            </DivTab>
            <TabContent {...props}>{props.children.find(child => child.props.value === tabs)}</TabContent>
        </Container>
    )
}
Tab.propTypes = {
    selected: PropTypes.number,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element
    ]).isRequired,
    disable:PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    fullHeight: PropTypes.bool,
    height: PropTypes.number
};
Tab.defaultProps = {
    selected: 0
}

export default Tab