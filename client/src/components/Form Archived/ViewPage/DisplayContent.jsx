/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useRef, useState} from "react";
import styled from "styled-components";
import FieldTag from "../FieldTag";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import NoFile from '../NoFile'
import LoadingFile from "../LoadingFile";
import { getFader } from "../../../utils/color";
const StyleContentWrapper = styled.div`
  flex: 10;
  height: 100%;
  background-color: #333 ;//${(props) => props.theme.color.background.secondary};
  color: ${(props) => props.theme.color.text.primary};
  border-left: 1px solid ${(props) => props.theme.color.border.primary};
  height: 100%;
  position: relative;
  overflow-y: overlay;
  overflow-x: hidden;
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
`;
const DocWrapper = styled.div`
    position: relative;
    min-height: 100%;
    & .abc {
        min-height: 100%;
    }
`
function DisplayContent({form}) {
  const [numPage, setNumPage] = useState(0)
  const [displayTag, setDisplayTag] = useState(false)
  let docRef = useRef()
  const renderPage = () => {
    let arr = []
    for (let i = 1; i <= numPage; i++) {
        arr.push(<Page key={i} width={docRef.current.getBoundingClientRect().width} pageNumber={i} renderTextLayer={false} renderAnnotationLayer={false}/>)
    }
    return arr
  }
  return (
    <StyleContentWrapper ref={docRef} className="contentw">
      {form ? 
      <DocWrapper className="doc-display">
        {displayTag && form.fieldData.map(tag => 
            <FieldTag 
                key={tag.id} 
                data={tag}
            />
        )}
        <Document 
            file={form.file}
            className="abc" 
            onLoadSuccess={(numPage) => {setNumPage(numPage._pdfInfo.numPages); setTimeout(() => setDisplayTag(true), 5000)}}
            noData={<NoFile/>}
        >
            {renderPage()}
        </Document>
      </DocWrapper> :
      <NoFile/> }
    </StyleContentWrapper>
  );
}

export default DisplayContent;
