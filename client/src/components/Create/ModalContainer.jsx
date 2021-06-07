/* eslint-disable react/prop-types */
import React from 'react'
import Modal from '../Modal'

const ModalContainer = ({modal, setModal}) => {
    return (
        <>
            <Modal height="80%" width="80%" visible={modal === "store"} onClickOutside = {() => setModal("")} title="Loading document">
                {/* <LoadingDocument dataStore={dataStore} setDataStore={setDataStore}/> */}
                Boom
            </Modal>
            <Modal height="80%" width="80%" visible={modal === "draft"} onClickOutside = {() => setModal("")} title="Saving draft document">
                {/* <SavingDraftDocument dataDraft={dataDraft} setdataDraft={setdataDraft}/> */}
                Boooom
            </Modal>
        </>
    )
}

export default ModalContainer