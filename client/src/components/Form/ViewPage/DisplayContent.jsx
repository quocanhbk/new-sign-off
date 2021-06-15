/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import ViewFieldTag from "./ViewFieldTag";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import NoFile from '../NoFile'
import axios from "axios";
import ListLoader from "../../ListLoader";

const DocWrapper = styled.div`
    position: relative;
    min-height: 100%;
    & .form-document {
        min-height: 100%;
    }
`
function DisplayContent({id}) {
  const [numPage, setNumPage] = useState(0)
  const [form, setForm] = useState()
  const [doc, setDoc] = useState()
  const [loading, setLoading] = useState(true)
  let docRef = useRef()

  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true)
      let {data} = await axios.get('/api/v1/forms/' + id)
      console.log(data)
      setForm(data)
      setLoading(false)
      let res = await axios.get(data.file.webUrl)
      console.log("Res", res)
    }
    fetchForm()
  }, [id])

  const renderPage = () => {
    let arr = []
    for (let i = 1; i <= numPage; i++) {
        arr.push(<Page key={i} width={docRef.current.getBoundingClientRect().width} pageNumber={i} renderTextLayer={false} renderAnnotationLayer={false}/>)
    }
    return arr
  }
  return (
    <div>
      {loading ? <ListLoader/> :
      <DocWrapper className="doc-display" ref={docRef}>
        {form.fields.map(field => 
            <ViewFieldTag 
                key={field.default_form_field_id} 
                data={field}
            />
        )}
        <Document 
            file={form.file.webUrl}
            className="form-document" 
            onLoadSuccess={(numPage) => {setNumPage(numPage._pdfInfo.numPages)}}
            noData={<NoFile/>}
        >
            {renderPage()}
        </Document>
      </DocWrapper>
      }
    </div>
  );
}

export default DisplayContent;
