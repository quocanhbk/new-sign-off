/* eslint-disable react/prop-types */
import React from 'react';
import {  BiLike,GiPauseButton,IoMdTime ,BiDislike} from 'react-icons/all';
import styled from 'styled-components'

const StyleIconStatus = styled.span`
`

function IconStatus({icon,className,size}) {


    return (
        <StyleIconStatus className={className}>
       {
        icon === "Approved" ?
        <BiLike size={size}/>
        :
        icon === "Stopped" ?
        <GiPauseButton size={size}/>
        :    
        icon === "Pending" ?
        <IoMdTime size={size}/>
        :      
        icon === "Rejected" ?
        <BiDislike size={size}/>
        :  
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-file-earmark-check-fill" viewBox="0 0 16 16">
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
        </svg> 
        }
        </StyleIconStatus>
    )
}

export default IconStatus;