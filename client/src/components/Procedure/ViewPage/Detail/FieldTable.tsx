import styled from "styled-components"

const Table = styled.table`
    border: none;
    width: 100%;
    background: ${props => props.theme.color.border.primary};
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
                        <Cell className="field-name" width="35%">
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
