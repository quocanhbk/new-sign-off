import React from "react"
import styled, { css } from "styled-components"
import pageList from 'pageList'
import { useStoreActions, useStoreState } from "easy-peasy"
import {getFader} from 'utils/color'
const NavList = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 0.5rem;
    align-items: center;
    border-top: 1px solid ${props => props.theme.color.border.primary};
    z-index: 66;
    background: ${props => props.theme.color.background.primary};
`
const NavItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    return (
        <NavList>
            {pageList.filter(p => !p.notVisible && !p.noMobile).map(item => 
                <NavItem key={item.text} onClick={() =>{setPath(item.link)}} active={item.link === path}>
                    {item.icon}
                    <p>{item.text.split(" ")[0]}</p>
                </NavItem>  
            )}
        </NavList>
    )
}

export default BottomBar