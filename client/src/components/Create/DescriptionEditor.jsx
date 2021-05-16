import React from 'react';
import styled from 'styled-components'

const StyleWrapper = styled.div`

`
const Text = styled.label`
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap; 

    font-size: 0.9rem;
    color : ${props => props.theme.color.text.secondary};

    padding: 0.5rem 0;
`

function DescriptionEditor() {
    return (
        <StyleWrapper>
            <Text>The flexible approval may not follow the operational procedures, approval participants are responsible for the completeness of attached documents.</Text>
        </StyleWrapper>
    );
}

export default DescriptionEditor;