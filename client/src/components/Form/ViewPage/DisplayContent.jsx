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
const DisplayContent = ({id}) => {
	const [numPage, setNumPage] = useState(0)
	const [form, setForm] = useState()
	const [doc, setDoc] = useState()
	const [loading, setLoading] = useState(true)
	let docRef = useRef()

	useEffect(() => {
		const fetchForm = async () => {
			setLoading(true)
			let {data} = await axios.get('/api/v1/forms/' + id)
			setForm(data)
			let res = (await axios.get('/api/v1/files/' + data.file.file_id)).data
			setDoc(res.downloadUrl)
			// setLoading(false)
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
		<div ref={docRef}>
		{loading && <ListLoader/>}
		<DocWrapper className="doc-display">
			{!loading && form.fields.map(field => 
				<ViewFieldTag 
					key={field.default_form_field_id} 
					data={field}
					fontSize={docRef.current.getBoundingClientRect().width/60 + "px"}
				/>
			)}
			<Document 
				file={doc}
				className="form-document" 
				onLoadSuccess={(numPage) => {setNumPage(numPage._pdfInfo.numPages); setLoading(false)}}
				noData={<NoFile/>}
			>
				{renderPage()}
			</Document>
		</DocWrapper>
		</div>
	);
}

export default DisplayContent;
