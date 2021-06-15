/* eslint-disable react/prop-types */
import React, {useState } from 'react'
import axios from 'axios'

const Verify = () => {
    
    const [file, setFile] = useState()
    const handleClick = async () => {
        let formData = new FormData()
        formData.append("file", file, file.name)
        let res = await axios.post('/api/v1/files', formData)
        console.log(res);
    }
    return (
        <div>
            <input type="file" name="" id="" onChange={e => setFile(e.target.files[0])}/>
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}



export default Verify