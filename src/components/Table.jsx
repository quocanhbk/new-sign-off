import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'

const TableComponent = styled.table`
    width: ${props => props.width || '100%'};
    margin: ${props => props.demo ? "8px": "0px"};
    box-shadow: none;
    border-collapse: collapse; 
    position: relative;
`;

const Header = styled.thead`
`;

const Row = styled.tr`
    background: transparent;
    transition: all 150ms ease-in;
    padding: ${props => props.footer ? "0.5rem" : "0"};
<<<<<<< HEAD
=======
    font-size:0.9rem;
>>>>>>> 180c030d32581ba52bf283d6f24a61a08a7626d8
`;

const HeaderCell = styled.th`
    cursor: pointer;
    color: ${props => props.theme.color.text.primary};
    padding: 0.3rem 0rem;
    font-weight: ${props => props.theme.weight.bold};
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    width: ${props => props.width || "auto"};
    text-align: ${props => props.textAlign || "center"};
<<<<<<< HEAD
=======
    font-size: 0.8rem;
>>>>>>> 180c030d32581ba52bf283d6f24a61a08a7626d8
`;
HeaderCell.propTypes = {
    width: PropTypes.string,
    textAlign: PropTypes.string
}
const Body = styled.tbody``;
const Cell = styled.td`
    padding: 0.4rem 0;
    text-overflow: ellipsis;
    text-align: ${props => props.textAlign || "left"};
`;

Cell.propTypes = {
    textAlign: PropTypes.string
}

// const Footer = (props) => {
//     return (
//         <tfoot>
//             <Row footer>
//                 {React.Children.map(props.children, child => React.cloneElement(child, {footer: true}))}
//             </Row>
//         </tfoot>
//     )
// }

function Table(props){
    return(
        <TableComponent {...props}>
         {props.children}
        </TableComponent>
    )
}

Table.Row = Row
Table.Header = Header
Table.HeaderCell = HeaderCell
Table.Body = Body
Table.Cell = Cell
// Table.Footer = Footer

Table.propTypes = {
    cellWidth: PropTypes.string,
    children: PropTypes.any,
}

export default Table