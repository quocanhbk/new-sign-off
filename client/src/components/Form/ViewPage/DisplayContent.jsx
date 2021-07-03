/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import FieldTag from "../FieldTag";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { getFader } from "utils/color";
import { deleteForm } from "api/form";
import ContentHeader from "./ContentHeader";
import { navigate } from "@reach/router";
import useForm from './useForm'
import LoadingFile from "../LoadingFile";
const Container = styled.div`
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
`

const DocWrapper = styled.div`
	
    position: relative;
    flex: 1;
	overflow: overlay;
    & .form-document {
        min-height: 100%;
		position: relative;
    }
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
const DocDisplay = styled.div`
	position: relative;
`
const DisplayContent = ({id}) => {
	const [numPage, setNumPage] = useState(0)
	const [renderFields, setRenderFields] = useState(false)
	// const [form, setForm] = useState()
	let docRef = useRef()
	const {form, render, setPercent} = useForm(id)
	const onDeleteClick = async () => {
		await deleteForm(id)
		navigate('/form')
	}
	useEffect(() => {
		return () => setRenderFields(false)
	}, [id])
	const editForm = () => {
		navigate('/form/create/' + id)
	}
	const renderPage = () => {
		let arr = []
		for (let i = 1; i <= numPage; i++) {
			arr.push(<Page key={i} width={docRef.current.getBoundingClientRect().width} pageNumber={i} renderTextLayer={false} renderAnnotationLayer={false}/>)
		}
		return arr
	}
	const renderDoc = () => 
		form &&
		<>	
			<ContentHeader title={form.name} onDeleteClick={onDeleteClick} onEditClick={editForm}/>
			<DocWrapper className="doc-display">
				{!renderFields && <LoadingFile/>}
				<DocDisplay>
					{renderFields && form.fields.map(field => 
						<FieldTag 
							key={field.id} 
							data={field}
							fontSize={docRef.current.getBoundingClientRect().width/60 + "px"}
							view
						/>
					)}
					<Document 
						file={form && form.file}
						className="form-document" 
						onLoadSuccess={(numPage) => {setNumPage(numPage._pdfInfo.numPages); setPercent(100); setRenderFields(true)}}
						noData={""}
						loading={""}
					>
						{renderPage()}
					</Document>
				</DocDisplay>
			</DocWrapper>
		</>
	
	//const {LoadingComponent, reset, setNotFound, setPercent} = useLoader(true, renderDoc(), <Placeholder type="NOT_FOUND"/>, true)

	// useEffect(() => {
	// 	const fetchForm = async () => {
	// 		setForm(null)
	// 		reset()
	// 		const formDetail = await getFormDetail(id, (v) => setPercent(v)).catch(_ => {setNotFound(true)})
	// 		setForm(formDetail)
	// 	}
	// 	fetchForm()
	// }, [id])

	return (
		<Container ref={docRef} className="container">
			{render(renderDoc())}
		</Container>
	);
}

export default DisplayContent;
