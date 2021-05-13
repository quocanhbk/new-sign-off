/* eslint-disable react/prop-types */
import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import styled, {keyframes} from 'styled-components'
import useClickOutside from '../hooks/useClickOutside'
import { getFader } from '../utils/color'
const Option = (props) => <div>{props.children}</div>

const StyledSpan = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: ${props => props.theme.color.text.primary};
`;

const IconX = () => {
    return (
        <StyledSpan>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </StyledSpan>
    )
}
const IconChevronDown = () => {
    return (
        <StyledSpan>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </StyledSpan>
    )
}

Option.propTypes = {
    id: PropTypes.number,
    searchText: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    default: PropTypes.bool,
    selectTodo: PropTypes.bool
}
const opa = keyframes `
    0% {transform: translateY(100%);opacity: 0;}
    100% {transform: translateY(0%);opacity: 1;}
`;
const out = keyframes`
    100% {transform: translateY(100%); opacity: 0;}
`;
const Container = styled.div`
    display: block;
    width: 100%;
    position: relative;
    cursor: pointer;
    margin-bottom: ${props => props.demo ? "8px" : "0px"};
    background-color: ${props=> props.theme.color.background.secondary};
`;
const Dummy = styled.div`
    margin-top: 4px;
    font-size: ${props=> props.theme.textSize.medium};
    overflow-x: hidden;
    width: 0;
`;
const Bar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: 1px solid ${props => props.open ? props.theme.color.fill.primary : props.theme.color.border.primary};
    box-shadow: 0 0 1px ${props => props.open ? "4px" : "0px"} ${props => getFader(props.theme.color.fill.primary, 0.15)};
    border-radius: 5px;
    transition: border 0.15s linear;
`;
const ItemContainer = styled.div`
    width: 100%;
    background: transparent;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow-y: auto;
    padding: 0px 6px 4px 6px;
    overflow-x: hidden;
    transition: all 1s linear;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const OpenButton = styled.div`
    display: flex;
    align-items: center;
    background-color: transparent;
    padding: 0 4px;
    border: none;
    border-radius: 0;
    outline: 0;
    transform: ${props => props.isOpen ? "rotateX(180deg)" : "rotateX(0deg)"};
    transition: all 0.15s linear;
`;
const slideDown = keyframes`
    from {max-height: 0px; opacity: 0;}
    to {max-height: 15rem; opacity: 1;}
`;
const SelectContainer = styled.div`
    border: 1px solid ${props => props.theme.color.border.primary};
    background: ${props => props.theme.color.background.primary};
    position: absolute;
    overflow: hidden;
    width: 100%;
    z-index: 2;
    border-radius: 5px;
    margin-top: 0.4rem;
    top: 100%;
    animation: ${slideDown} 0.15s ease-out 0s 1 forwards normal;
`;
const Selection = styled.div`
    padding: 0.5rem;
    background-color: ${props => props.selected ? props.theme.color.border.primary: "transparent"};
    &:hover {
        background-color: ${props => props.selected ? props.theme.color.border.primary : props.theme.color.background.secondary};
    }
    color: ${props => props.theme.color.text.primary};
`;
const StyledItem = styled.div`
    display: flex;
    align-items: center;
    pointer-events: ${props => props.multiple ? 'unset' : 'none'};
    background: ${props => props.multiple ? props.theme.color.border.primary : 'transparent'};
    color: ${props => props.theme.color.text.primary};
    animation: ${opa} 0.15s linear 0s 1 normal forwards;
    border-radius: 2px;
    padding: 0px 0px 0px 8px;
    margin-right: 6px;
    margin-top: 4px;
    font-size: ${props=> props.theme.textSize.medium};
    overflow-x: hidden;
    cursor: pointer;
    transition: all 1s linear;
    &.item-out {
        animation: ${out} 0.15s ease-out 0s 1 normal forwards;
    }
`;
const XContainer = styled.div`
    margin-left: 6px;
    padding: 0px;
    border-left: 1px solid ${props => props.theme.color.border.primary};
`;
const SearchBarContainer = styled.div`
    background: transparent;
    padding: 0.5rem 0.5rem;
`;
const SearchBar = styled.input`
    background: transparent;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    outline: 0;
    width: 100%;
    border: none;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    color: ${props => props.theme.color.fill.primary};
`;
const SelectionContainer = styled.div`
    overflow: auto;
    max-height: 12rem;
    &::-webkit-scrollbar {
        width: 0rem;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => getFader(props.theme.color.fill.primary, 0.5)};
        border-radius: 999px;
    }
    &:hover {
        &::-webkit-scrollbar {
            width: 0.4rem;
        }
        &::-webkit-scrollbar-thumb:hover {
            background-color: ${props => getFader(props.theme.color.fill.primary, 0.8)};
        }
        &::-webkit-scrollbar-thumb:active {
            background-color: ${props => props.theme.color.fill.primary};   
        }
    }
`
const Divider = styled.div`
    height: 0.5px;
    transform: translateY(-0.5px);
    background: ${props => props.theme.color.border.primary};
    margin: 0px 0.2rem 0px 0.6rem;
`
function Combox(props) {
    const {onSelect, children, selectTodo} = props
    const [isOpen, setIsOpen] = useState(false);
    const comboxRef = useClickOutside(() => setIsOpen(false))
    // Selected item
    const [items, setItems] = useState(children.filter(child => child.props.default).map(child => child.props))
    const [returnItems, setReturnItems] = useState([])
    const [seachText, setSeachText] = useState("")
    const [removingItem, setRemovingItem] = useState("")
    const refSearchBar = useRef(null)

  
    
    const addItem = (itemProp) => {
        if (props.multiple) {
            if (items.map( item => item.id).includes(itemProp.id) ) { removeItem(itemProp.id) }
            else setItems([...items, itemProp])
        }
        else {
            setItems([itemProp])
            setIsOpen(false)
        } 
    }
    
    useEffect(()=>{
        setItems(children.filter(child => child.props.default).map(child => child.props))
    },[selectTodo])

    useEffect(() => {
        setReturnItems(items.map(item => item.value))
    },[items])


    useEffect(() => {
        onSelect(returnItems)
    }, [returnItems, onSelect])

    useEffect(() => {
        if (isOpen) {
            if (refSearchBar.current) {
                refSearchBar.current.focus()
                setSeachText("")
            }
        }
    }, [isOpen])

    const removeItem = (id) => {
        setRemovingItem(id)
        setTimeout(() => {
            setItems(items.filter(item => item.id !== id))
            setRemovingItem("")
        }, 300)
    }

    const handleSearchText = (e) => {
        setSeachText(e.target.value)
    }

    const handleOpen = (state) => {
        setIsOpen(state)
    }
    return (
        <Container ref={comboxRef} demo={props.demo}>
            <Bar open={isOpen} onClick={() => handleOpen(true)}>
                <ItemContainer onClick={() => handleOpen(true)}>
                    <Dummy>X</Dummy>
                    {items.map(item => 
                    <StyledItem multiple={props.multiple} key={item.id} className={removingItem === item.id ? "item-out" : ""}>
                        {item.children}
                        <XContainer onClick={() => removeItem(item.id)}>
                            <IconX/>
                        </XContainer>
                    </StyledItem>
                    )}
                </ItemContainer>
                <OpenButton isOpen={isOpen} onClick={() => handleOpen(!isOpen)}><IconChevronDown/></OpenButton>
            </Bar>
            {isOpen && 
                <SelectContainer>
                    {props.searchable &&
                    <SearchBarContainer>
                        <SearchBar ref={refSearchBar} type="input" spellCheck="false" placeholder="Search..." value={seachText} onChange={handleSearchText}/>
                    </SearchBarContainer>
                    }
                    <SelectionContainer>
                    {
                        (props.searchable ? props.children
                        .filter(child => child.props.searchText.concat([child.props.value]).map(c => c.toString().toUpperCase()).join("|").includes(seachText.toUpperCase().trim()))
                        : props.children)
                            .map(child => 
                                <>
                                <Selection 
                                    selected={items.map(item => item.id).includes(child.props.id)} 
                                    key={child.props.id}
                                    onClick={() => addItem(child.props)}>{child.props.children}
                                </Selection>
                                <Divider/>
                                </>
                            )
                    }
                    </SelectionContainer>
                    
                </SelectContainer>
            }
        </Container>
    )
}

Combox.Option = Option
Combox.propTypes = {
    multiple: PropTypes.bool,
    searchable: PropTypes.bool,
    onSelect: PropTypes.func
}
Combox.defaultProps = {
    multiple: false,
    searchable: false,
    onSelect: () => {}
}

export default Combox