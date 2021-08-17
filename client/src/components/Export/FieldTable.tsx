/* eslint-disable react/prop-types */
import styled from "styled-components"

const Container = styled.table`
    width: 100%;
    border-collapse: collapse;

    & th,
    td {
        border: none !important;
    }

    & tr:not(:last-child) {
        border-bottom: 1px solid #666;
    }
`

const FieldTable = ({ attachment }) => {
    return attachment.fields.length > 0 ? (
        <Container>
            <tbody>
                {attachment.fields.map(field => (
                    <tr key={field.id}>
                        <td>{field.name}</td>
                        <td>{field.content}</td>
                    </tr>
                ))}
            </tbody>
        </Container>
    ) : (
        <p style={{ fontStyle: "italic" }}>No Field</p>
    )
}

export default FieldTable
