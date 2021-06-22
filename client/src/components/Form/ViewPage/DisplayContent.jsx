/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import FieldTag from "../FieldTag";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { getFader } from "utils/color";
import { getFormDetail, deleteForm } from "api/form";
import ContentHeader from "./ContentHeader";
import { navigate } from "@reach/router";
import useLoader from 'hooks/useLoader'
import Placeholder from "components/Placeholder";

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
	const [form, setForm] = useState()
	//const [notFound, setNotFound] = useState(false)
	let docRef = useRef()
	//const {loading, percent, setPercent, reset} = useLoading()
	const onDeleteClick = async () => {
		await deleteForm(id)
		navigate('/form')
	}

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
				<DocDisplay>
					{form && form.fields.map(field => 
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
						onLoadSuccess={(numPage) => {setNumPage(numPage._pdfInfo.numPages); setPercent(100)}}
						noData={""}
						loading={""}
					>
						{renderPage()}
					</Document>
				</DocDisplay>
			</DocWrapper>
		</>
	
	const {LoadingComponent, reset, setNotFound, setPercent} = useLoader(true, renderDoc(), <Placeholder type="NOT_FOUND"/>, true)

	useEffect(() => {
		const fetchForm = async () => {
			setNotFound(false)
			setForm(null)
			reset()
			const formDetail = await getFormDetail(id, (v) => setPercent(v)).catch(_ => {setNotFound(true)})
			setForm(formDetail)
		}
		fetchForm()
	}, [id])

	return (
		<Container ref={docRef} className="container">
			{LoadingComponent}
		</Container>
	);
}

export default DisplayContent;
