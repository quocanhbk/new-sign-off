/* eslint-disable react/prop-types */
import styled from "styled-components"

const Table = styled.table`
    border: none;
    border-left: 1px solid ${props => props.theme.color.border.primary};
    border-right: 1px solid ${props => props.theme.color.border.primary};
    width: 100%;
    background: ${props => props.theme.color.background.secondary};
`
const Row = styled.tr`
    & .field-name {
        color: ${props => props.theme.color.text.secondary};
    }
`

const Cell = styled.td`
    padding: 0.2rem;
`

const FieldTable = ({ fields }) => {
    return (
        <Table>
            <tbody>
                {fields.map(field => (
                    <Row key={field.name}>
                        <Cell className="field-name" width="40%">
                            {field.name}
                        </Cell>
                        <Cell className="field-value">{field.defaultValue}</Cell>
                    </Row>
                ))}
            </tbody>
        </Table>
    )
}

export default FieldTable
