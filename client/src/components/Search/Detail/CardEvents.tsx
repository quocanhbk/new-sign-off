import styled from "styled-components"
import LazyImage from "components/Base/LazyImage"
import { getAvatar } from "api/user"
import { getFader } from "utils/color"
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
            color: ${props => props.theme.color.fill.secondary};
        }
        & .create-date-event {
            font-size: 0.8rem;
            color: ${props => props.theme.color.text.secondary};
            font-style: italic;
        }
        & .last-approver {
            color: red;
        }
    }

    & .title-event {
        font-size: 1rem;
        line-height: 1.2;
    }
`
const LastApprover = styled.span`
    background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    color: ${props => props.theme.color.fill.info};
    padding: 0.2rem 0.4rem;
    border-radius: 0.2rem;
    font-size: 0.8rem;
    font-weight: 500;
`
function CardEvents({ createdAt, createdBy, description, last }) {
    return (
        <CardWrapper>
            <DivAvatar>
                <LazyImage src={getAvatar(createdBy.email)} size="sm" />
            </DivAvatar>
            <DivInfo>
                <span className="create-event">
                    <p className={`create-by-event`}>{createdBy.name}</p>
                    {last && <LastApprover>Last Approver</LastApprover>}
                    <p className="create-date-event">{createdAt}</p>
                </span>
                <p className="title-event">{description}</p>
            </DivInfo>
        </CardWrapper>
    )
}

export default CardEvents
