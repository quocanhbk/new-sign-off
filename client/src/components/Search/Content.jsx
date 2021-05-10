import React from 'react';
import styled from 'styled-components'
import {getFader} from '../../utils/color'

const ContentWrapper = styled.div`
    display:flex;
    flex-direction: column;
`
const ContentContainer = styled.div`
    flex: 10;

    padding: 0.5rem 1rem;

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
const DivContent = styled.div`
    padding: 0.5rem 0;
`
const Label = styled.p`
    font-weight: bold;
    color: ${props => props.theme.color.text.secondary};
`
const TextFill  = styled.p`
    padding: 0.3rem 0;

    color: ${props => props.theme.color.text.secondary};
`
function Content() {
    return (
        <ContentWrapper>
            
            <ContentContainer>
                <DivContent>
                    <Label>RELATED PROJECT</Label>
                    <TextFill>TTG - Tập đoàn Trung Thủy</TextFill>
                </DivContent>
                <DivContent>
                    <Label>Description</Label>
                    <TextFill>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum dolor dolorem soluta illum recusandae expedita consectetur? Nesciu
                            nt qui modi dolore similique? Molestias odit explicabo consequatur molestiae in ducimus modi. Lorem ipsum dolor sit amet 
                            consectetur adipisicing elit. Aliquid iure labore officia. Expedita suscipit odit non eligendi laudantium deserunt perspiciatis. 
                            Alias possimus quas, accusantium neque minus asperiores natus error magnam!, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum dolor dolorem soluta illum recusandae expedita consectetur? Nesciu
                            nt qui modi dolore similique? Molestias odit explicabo consequatur molestiae in ducimus modi. Lorem ipsum dolor sit amet 
                            consectetur adipisicing elit. Aliquid iure labore officia. Expedita suscipit odit non eligendi laudantium deserunt perspiciatis. 
                            Alias possimus quas, accusantium neque minus asperiores natus error magnam!
                    </TextFill>
                </DivContent>
            </ContentContainer>
        </ContentWrapper>
    );
}

export default Content;