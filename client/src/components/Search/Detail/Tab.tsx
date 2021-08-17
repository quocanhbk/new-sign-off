import styled from "styled-components"
import PropTypes from "prop-types"
import { useState } from "react"
import { getFader } from "utils/color"

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: overlay;
`
const DivTab = styled.div`
    display: flex;
    position: relative;
    & span {
        --abc: ${props => props.value - 1};
        position: absolute;
        top: 0;
        left: calc(100% / 3 * var(--abc));
        width: calc(100% / 3);
        height: 0.2rem;
        background: ${props => props.theme.color.fill.primary};
        transition: all 0.25s ease-in-out;
    }
`
const ButtonTab = styled.button`
    display: block;
    border: none;
    border-left: 1px solid ${props => props.theme.color.border.primary};
    &:first-child {
        border-left: none;
    }
    cursor: pointer;
    width: 100%;
    outline: none;
    padding: 1rem 0.5rem;
    font-size: calc(0.8rem + 0.25vw);
    font-weight: ${props => (props.active ? 600 : 500)};
    color: ${props => (props.active ? props.theme.color.fill.primary : props.theme.color.fill.secondary)};
    transition: all 0.25s ease-in-out;
    background-color: ${props =>
        props.active ? props.theme.color.background.secondary : props.theme.color.background.primary};
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    transition: all 0.25s ease-out;
    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.2)};
    }
    &:disabled {
        color: ${props => props.theme.color.text.disabled};
    }
`
const TabContent = styled.div`
    flex: 1;
    overflow: auto;
    background: ${props => props.theme.color.background.secondary};
`

const Tab = props => {
    const [currentTab, setCurrentTab] = useState(
        (props.children.find(child => child.props.selected) || props.children.find(child => !child.props.disabled))
            .props.value
    )
    const selectTab = value => {
        if (!props.children.find(child => child.props.value === value).props.disabled) setCurrentTab(value)
    }
    return (
        <Container>
            <DivTab value={currentTab}>
                {props.children.map(tab => (
                    <ButtonTab
                        active={tab.props.value === currentTab}
                        onClick={() => selectTab(tab.props.value)}
                        key={tab.props.value}
                        disabled={tab.props.disabled}
                    >
                        {tab.props.name}
                    </ButtonTab>
                ))}
                <span></span>
            </DivTab>
            <TabContent>{props.children.find(child => child.props.value === currentTab)}</TabContent>
        </Container>
    )
}
Tab.propTypes = {
    selected: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
    disable: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    fullHeight: PropTypes.bool,
    height: PropTypes.number,
}
Tab.defaultProps = {
    selected: 0,
}

export default Tab
