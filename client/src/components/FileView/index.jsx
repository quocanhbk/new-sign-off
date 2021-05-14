/* eslint-disable react/prop-types */
import React from 'react'
import ImageItem from './ImageItem'

const FileView = (props) => {
    const data = props.location.state.path
    return (
        <div style={{position:'absolute', width: "100%"}}>
            {data.map(item => 
                <ImageItem 
                    key={item.path} 
                    src={item.path}
                    tagList={item.tagList}
                />    
            )}
        </div>
    )
}

export default FileView