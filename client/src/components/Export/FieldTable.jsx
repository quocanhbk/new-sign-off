/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const Container = styled.table`
    width: 100%;
    border-collapse: collapse;
    box-sizing: border-box;
    
    & th, td {
        border: none !important;
    }

    & tr:not(:last-child) {
        border-bottom: 1px solid black;
    }
`

const FieldTable = ({attachment}) => {
    return (
        attachment.fields.length > 0 ?
        <Container>
            <tbody>
            {attachment.fields.map((field) => (
                <tr key={field.id}>
                    <td>{field.name}</td>
                    <td>{field.content}</td>
                </tr>
            ))}
            </tbody>
        </Container> : <p style={{fontStyle: "italic"}}>No Field</p>
    )
}

export default FieldTable