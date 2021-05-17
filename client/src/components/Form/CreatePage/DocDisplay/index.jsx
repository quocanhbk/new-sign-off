/* eslint-disable react/prop-types */
import React, {} from 'react'

import IconWrapper from '../IconWrapper';
import DocContent from './DocContent'
import {MainContainer, Bar, DocWrapper} from './StyledComponent'
import {BsCardText, BsPen, BsFileEarmarkArrowUp, BsTrash} from 'react-icons/bs'

const DocDisplay = ({file, setFile, addingField, setAddingField, fieldData, handleClickDoc, numPage, setNumPage, docRef, pageRef, moveField, resizeField}) => {
    return (
        <MainContainer className="maincontainer">
            {file && 
                <Bar>
                    <div>
                        <IconWrapper onClick={() => setAddingField(!addingField)}>
                            <BsCardText/> Add Field
                        </IconWrapper>
                        <IconWrapper>
                            <BsPen/> Add Signature
                        </IconWrapper>
                    </div>
                    <div style={{marginLeft: "auto"}}>
                        <IconWrapper color="warning">
                            <BsFileEarmarkArrowUp/> Change File
                        </IconWrapper>
                        <IconWrapper color="danger">
                            <BsTrash/> Delete File
                        </IconWrapper>
                    </div>
                </Bar>
            }
            <DocWrapper>
                <DocContent
                    file={file}
                    setFile={setFile}
                    addingField={addingField}
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