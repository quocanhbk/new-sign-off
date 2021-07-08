/* eslint-disable react/prop-types */
import React from 'react'
import Button from 'components/Base/Button'
import {BiDislike, BiLike, BiRevision, BsClock, GiPauseButton} from 'react-icons/all'
const StatusTag = ({status, onClick, readOnly}) => {
    const genColor = () => {
		switch (status) {
			case "Approved":
				return "success"
			case "Rejected":
				return "danger"
			case "Draft":
				return "secondary"
			case "Pending":
				return "warning"
			case "Revising":
				return "info"
			default:
				return "primary"
		}
	}
	const renderIcon = () => {
        switch(status) {
            case "Approved":
                return <BiLike/>
            case "Pending":
                return <BsClock/>
            case "Rejected":
                return <BiDislike/>
            case "Revising":
                return <BiRevision/>
            default:
                return <GiPauseButton/>
        }
    }
    return (
        <Button readOnly={readOnly} type="fade" weight="400" gap="0.2rem" color={genColor()} padding="0.2rem 0.4rem" fontSize="0.8rem" onClick={onClick}>
            {renderIcon()}
            <p>{status}</p>
        </Button>
    )
}

export default StatusTag