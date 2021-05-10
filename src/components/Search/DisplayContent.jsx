import React from 'react';
import styled from 'styled-components'
import {getFader} from '../../utils/color'
import Tab from '../Tab'
import TabPane from '../TabPane'
import Content from './Content'

const StyleContentWrapper = styled.div`
    flex: 10;
    background-color: ${props => props.theme.color.background.secondary};
    color: ${(props) => props.theme.color.text.primary};
    padding: 0.5rem;
    border-left: 1px solid ${props => props.theme.color.border.primary};
    overflow: overlay;
    position: relative;
    ::-webkit-scrollbar {
    width: 0.5rem;
    }
    ::-webkit-scrollbar-track {
    background: transparent;
    }
    ::-webkit-scrollbar-thumb {
    background: ${props => getFader(props.theme.color.fill.secondary, 0.5)};
    border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.color.fill.secondary};
    }
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