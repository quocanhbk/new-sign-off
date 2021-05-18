/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import TabsComponent from './TabsComponent'

const StyleWrapper = styled.div`
    display:flex;
    width: 100%;
`

function TabApprovalProcess({data, setData, dataForm}) {    
    
    const handleFile = (e,id) =>{
        let newData = data
        let currentApprovalData = newData.approvalDocument.find(doc => doc.id === id)
        currentApprovalData.data = [...currentApprovalData.data,{
            id : Math.random(),
            name: "",
            file_name: e.target.files[0].name,
            file_data: e.target.files[0],
            data_field: [],
        }
        ]
        setData(newData)
    }
    
    return (
        <StyleWrapper>
            <TabsComponent tabItems={data.approvalDocument} dataForm={dataForm} handleFile={handleFile}/>     
        </StyleWrapper>
    );
}

export default TabApprovalProcess;