/* eslint-disable react/prop-types */
import React, {} from 'react'

import IconWrapper from '../IconWrapper';
import DocContent from './DocContent'
import {MainContainer, Bar, DocWrapper} from './StyledComponent'
import {BsCardText} from 'react-icons/bs'

const DocDisplay = ({file, initForm, addingTag, setAddingTag, fieldData, handleClickDoc, numPage, setNumPage, docRef, pageRef, moveField, resizeField}) => {
    return (
        <MainContainer className="maincontainer">
            {file && 
                <Bar>
                    <div>
                        <IconWrapper onClick={() => setAddingTag(addingTag === null ? "field" : null)}>
                            <BsCardText/> Add Field
                        </IconWrapper>
                    </div>
                    {/* <div style={{marginLeft: "auto"}}>
                        <IconWrapper color="warning">
                            <BsFileEarmarkArrowUp/> Change File
                        </IconWrapper>
                    </div> */}
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
                    docRef={docRef}
                    pageRef={pageRef}
                    moveField={moveField}
                    resizeField={resizeField}
                />
            </DocWrapper>
        </MainContainer>
    )
}

export default DocDisplay