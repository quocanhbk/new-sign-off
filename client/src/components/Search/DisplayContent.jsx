import React from 'react';
import styled from 'styled-components'
import Tab from '../Tab'
import TabPane from '../TabPane'
import Content from './Content'

const StyleContentWrapper = styled.div`
    flex: 10;
    background-color: ${props => props.theme.color.background.secondary};
    color: ${(props) => props.theme.color.text.primary};
    border-left: 1px solid ${props => props.theme.color.border.primary};
`

function DisplayContent() {
    return (
        <StyleContentWrapper>
            <Tab>
                <TabPane name="Content" key={1} value="1">
                    <Content/>
                </TabPane>
                <TabPane name="Approval Flow" key={2} value="2">
                
                </TabPane>
                <TabPane name="Info" key={3} value="3">
                
                </TabPane>
            </Tab>
        </StyleContentWrapper>
    );
}

export default DisplayContent;