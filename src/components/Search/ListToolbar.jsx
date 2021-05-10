import React, { useState } from 'react';
import styled from 'styled-components'
import Searchbar from '../Searchbar'
import {  BsFunnel } from 'react-icons/bs';
import useClickOutside from '../../hooks/useClickOutside'

const StyleToolbar = styled.div`
    display:flex;
    gap: 0.5rem;
    align-items: center;
    padding: 1rem 0 0.5rem;
`
const IconWrapper = styled.button`
  color: ${(props) => props.theme.color.fill.primary};
  background-color: transparent;
  border: none;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  &:hover {
    background: ${props => props.theme.color.border.primary};
  }
`;
const PopupWrapper = styled.div`
    position: absolute;
    width: 160px;
    height: 160px;
    right: 0;
    top: 120%;
    z-index: 99;
    border: 1px solid ${props => props.theme.color.border.primary};
    background: ${props => props.theme.color.background.primary};
    border-radius: 1rem;
`

function ListToolbar() {
    const [filterPopup, setFilterPopup] = useState(false)
    const ref1 = useClickOutside(() => {setFilterPopup(false);console.log("1")})

    const handlePopup = (e, type) => {
        e.preventDefault()
        if (type === "filter") {
            setFilterPopup(!filterPopup)
        }
    }

    return (
        <StyleToolbar>
            <Searchbar/>
            <IconWrapper ref={ref1}>
                <BsFunnel size="20px" onClick={(e) => handlePopup(e, "filter")}/>
                {filterPopup && <PopupWrapper>Filter</PopupWrapper>}
            </IconWrapper>
        </StyleToolbar>
    );
}

export default ListToolbar;