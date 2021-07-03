import React, { useRef, useState } from "react"
import styled, { css } from "styled-components"
import pageList from 'pageList'
import { useStoreActions, useStoreState } from "easy-peasy"
import {getFader} from 'utils/color'
import {BsThreeDots} from 'react-icons/bs'
import UserProfilePopup from "./UserProfilePopup"
import useClickOutside from 'hooks/useClickOutside'
const NavList = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    z-index: 66;
    border-top: 1px solid ${props => props.theme.color.border.primary};
    background: ${props => props.theme.color.background.primary};
    padding: 0.5rem;
    position: relative;
`
const NavItem = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    ${props => props.active && css`
        background: ${props => getFader(props.theme.color.fill.primary, 0.2)};
        color: ${props => props.theme.color.fill.primary};
    `}
`

const BottomBar = () => {
    const setPath = useStoreActions(_ => _.setPath)
	const path = useStoreState(_ => _.path)
    const [popup, setPopup] = useState(false)
    let otherRef = useRef()
    let popupRef = useClickOutside (() => setPopup(false), otherRef.current)
    return (
        <NavList>
            {pageList.filter(p => !p.notVisible && !p.noMobile).map(item => 
                <NavItem key={item.text} onClick={() =>{setPath(item.link)}} active={item.link === path}>
                    {item.icon}
                    <p>{item.text.split(" ")[0]}</p>
                </NavItem>
            )}
            <NavItem special onClick={() => setPopup(!popup)} ref={otherRef}>
                <BsThreeDots size="24px"/>
                More
            </NavItem>
            {popup && 
                <UserProfilePopup reff={popupRef}/>
            }
        </NavList>
    )
}

export default BottomBar