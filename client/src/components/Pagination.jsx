/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledSpan = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

const ChevLeft = () => {
    return (
        <StyledSpan>
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </StyledSpan>
    )
}
const ChevRight = () => {
    return (
        <StyledSpan>
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </StyledSpan>
    )
}

const Container = styled.ul`
    display: ${props => props.stretch ? "flex" : "inline-flex"};
    gap: 1px;
    background: ${props => props.theme.color.border.primary};
    justify-content: center;
    align-items: center;
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 4px;
    overflow: hidden;
`;
const Item = styled.li`
    cursor: pointer;
    list-style: none;
    text-align: center;
    width: 2.5rem;
    height: 2rem;
    flex: 1;
    line-height: 2rem;
    user-select: none;
    color: ${props => props.active ? props.theme.color.background.primary : props.theme.color.text.primary};
    background: ${props => props.active ? props.theme.color.fill.primary : props.theme.color.background.primary};
    &:hover{
        background: ${props => props.active ? "auto" : props.theme.color.border.primary};
    }
`;

function Pagination(props){
    let {totalPage, boundary, sibling, onSelect, activePage} = props
    
    const selectPage = (page)=>{
        if(page === "...") return
        else if(page <= 1) onSelect(1)
        else if(page >= totalPage) onSelect(totalPage)
        else onSelect(page)
    }
    

    const [paginationMid, setPaginationMid] = useState([])
    const [paginationLeft, setPaginationLeft] = useState([])
    const [paginationRight, setPaginationRight] = useState([])

    useEffect(()=>{
        let data_middle = [], data_right = [], data_left = []

        if(boundary && sibling){
            // lay so page 
            for(let i=1; i <= totalPage; i++){
                if(i<=boundary){ data_left.push(i) }
                else if(i>totalPage - boundary){ data_right.push(i) }
                else{ data_middle.push(i) }
            } //end    
        }

        // set lại pagination nếu totalPage > 10
        if (totalPage <= 10) {
            setPaginationMid(data_middle)
            setPaginationLeft(data_left)
            setPaginationRight(data_right)
        } else {
            let lefttemp = [], righttemp = [], midtemp = []
            if(activePage <= boundary + sibling + 1){
                lefttemp = data_left
                for(let i=boundary+1; i<=(boundary + 1 + sibling*2 + 1); i++){
                    midtemp.push(i)
                }
                midtemp.push("...")
                righttemp = data_right
            }
            else if(activePage >= (boundary + sibling - 1) && activePage <= (totalPage - sibling - boundary - 1)){
                lefttemp = data_left
                righttemp = data_right
                midtemp.push("...")
                for(let i=(activePage - sibling); i<=(activePage+sibling); i++){
                    midtemp.push(i)
                }
                midtemp.push("...")
            }
            else{
                lefttemp = data_left
                midtemp.push("...")
                for(let i=(totalPage - boundary - sibling*2 - 1); i<=(totalPage - boundary); i++){
                    midtemp.push(i)
                }
                righttemp = data_right
            }
            setPaginationLeft(lefttemp)
            setPaginationMid(midtemp)
            setPaginationRight(righttemp)
        }
    },[activePage, boundary, sibling, totalPage])

    return( 
        <Container>
            <Item onClick={()=>selectPage(activePage - 1)}><ChevLeft/></Item>
            {
                paginationLeft.map((value, index)=>{
                    return(
                        <Item key={index} onClick={()=>selectPage(value)} value={value} active={value === activePage}>
                            {value}
                        </Item>
                    )
                })
            }
            { 
                paginationMid.map((value, index)=>{
                    return(
                        <Item key={index} onClick={()=>selectPage(value)} value={value} active={value === activePage}>
                            {value}
                        </Item>
                    )
                })
            }
            {
                paginationRight.map((value, index)=>{
                    return(
                        <Item key={index} onClick={()=>selectPage(value)} value={value} active={value === activePage}>
                            {value}
                        </Item>
                    )
                })
            }
            <Item onClick={()=>selectPage(activePage + 1)}><ChevRight/></Item>
        </Container>
    )
}

Pagination.defaultProps = {
    boundary: 1,
    sibling: 1,
    onSelect: () => {}
}

Pagination.propTypes ={
    boundary: PropTypes.number,
    sibling: PropTypes.number,
    activePage: PropTypes.number.isRequired,
    onSelect: PropTypes.func
}

export default Pagination