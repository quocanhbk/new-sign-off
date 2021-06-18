/* eslint-disable react/prop-types */
import React, {} from 'react'

import IconWrapper from '../IconWrapper';
import DocContent from './DocContent'
import {BsCardText} from 'react-icons/bs'
import styled from 'styled-components';
import { getFader } from '../../../../utils/color';

const MainContainer = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
`
const Bar = styled.div`
    display: flex;
    padding: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};

    & div {
        display: flex;
        gap: 0.5rem;
    }
`
const DocWrapper = styled.div`
    flex: 1;
    position: relative;
    overflow: overlay;
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

const DocDisplay = ({file, initForm, addingTag, setAddingTag, fieldData, handleClickDoc, numPage, setNumPage, moveField, resizeField}) => {
    return (
        <MainContainer>
            {file && 
                <Bar>
                    <IconWrapper onClick={() => setAddingTag(addingTag === null ? "field" : null)}>
                        <BsCardText/> Add Field
                    </IconWrapper>
                </Bar>
            }
            <DocWrapper>
                <DocContent
                    file={file}
                    initForm={initForm}
                    addingTag={addingTag}
                    fieldData={fieldData}
                    handleClickDoc={handleClickDoc}
                    numPage={numPage}
                    setNumPage={setNumPage}
                    // docRef={docRef}
                    // pageRef={pageRef}
                    moveField={moveField}
                    resizeField={resizeField}
                />
            </DocWrapper>
        </MainContainer>
    )
}

export default DocDisplay