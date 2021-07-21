/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import LazyImage from "components/LazyImage"
import { getAvatar } from "api/user"
const CardWrapper = styled.div`
    display: flex;
    padding: 0.5rem 0;
    & > * + * {
        margin-left: 0.5rem;
    }
`
const DivAvatar = styled.div`
    padding: 0;
    & img {
        border-radius: 99px;
    }
`
const DivInfo = styled.div`
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top: 0.2rem;
    }
    & .create-event {
        display: flex;
        align-items: center;
        & > * + * {
            margin-left: 1rem;
        }

        & .create-by-event {
            font-weight: 600;
            color: ${(props) => props.theme.color.fill.secondary};
        }
        & .create-date-event {
            font-size: 0.8rem;
            color: ${(props) => props.theme.color.text.secondary};
            font-style: italic;
        }
    }

    & .title-event {
        font-size: 1rem;
        line-height: 1.2;
    }
`
function CardEvents({ createdAt, createdBy, description, type }) {
    return (
        <CardWrapper>
            <DivAvatar>
                <LazyImage
                    src={getAvatar(createdBy.email)}
                    height="28"
                    width="28"
                />
            </DivAvatar>
            <DivInfo>
                <span className="create-event">
                    <p className="create-by-event">{createdBy.name}</p>
                    <p className="create-date-event">{createdAt}</p>
                </span>
                <p className="title-event">{description}</p>
            </DivInfo>
        </CardWrapper>
    )
}

export default CardEvents
