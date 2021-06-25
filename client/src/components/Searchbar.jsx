/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const StyledIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 100%;
    color: ${props => props.theme.color.fill.primary};
`

const Icon = () => {
    return (
        <StyledIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
        </StyledIcon>
    )
}
const StyledSearchbar = styled.div`
    position: relative;
    border: 1px solid ${props => props.theme.color.border.primary};
    background: ${props => props.theme.color.background.secondary};
    height: 2.5rem;
    padding: 0 1rem;
    color: ${props => props.theme.color.text.primary};
    border-radius: 5rem;
    overflow: hidden;
    flex: 1;
`
const StyledInput = styled.input`
    background: transparent;
    height: 100%;
    border: none;
    color: ${props => props.theme.color.text.primary};
    font-size: 1rem;
    padding-right: 1.5rem;
    outline: none;
    width: 100%;
    
`
const Searchbar = ({search, setSearch}) => {
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    return (
        <StyledSearchbar>
            <StyledInput 
                value={search} 
                onChange={handleChange} 
                type="text" 
                placeholder="Search for something..."
                spellCheck="false"
            />
            <Icon/>
        </StyledSearchbar>

    )
}

export default Searchbar