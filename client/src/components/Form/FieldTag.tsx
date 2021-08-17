/* eslint-disable react/prop-types */
import styled, { css } from "styled-components"

const Container = styled.div`
    position: absolute;
    min-width: 6rem;
    min-height: 2rem;
    color: black;
    padding-left: 0.2rem;
    z-index: 3;
    user-select: none;
    cursor: ${props => (props.view ? "default" : "pointer")};
    font-size: ${props => props.fontSize || "1rem"};
    & p {
        word-break: keep-all;
    }
    & .name {
        position: absolute;
        transform: translateY(-110%);
        font-size: 0.8rem;
        font-style: italic;
        color: #a3a3a3;
    }

    & .type {
        position: absolute;
        bottom: 0;
        transform: translateY(100%);
        font-size: 0.8rem;
        font-style: italic;
        color: #a3a3a3;
    }
`
const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #1b97fc39;
    border-radius: 0.25rem;
    z-index: -1;
    ${props =>
        !props.view &&
        css`
            border: 1px solid #3f3cff;
        `}
`
let Resizer = styled.div`
    position: absolute;
    cursor: se-resize;
    right: 0;
    bottom: 0;
    height: 8px;
    width: 8px;
    border-radius: 99px;
    transform: translate(45%, 45%);
    background: #fff;
    border: 2px solid #3f3cff;
`
interface FieldTagProps {
    data?
    onMouseDown?
    onMouseDownResizer?
    reff?
    fontSize?
    view?
}

const FieldTag = ({ data, onMouseDown, onMouseDownResizer, reff, fontSize, view }: FieldTagProps) => {
    return (
        <Container
            ref={reff}
            onMouseDown={onMouseDown}
            fontSize={fontSize}
            view={view}
            style={{
                left: data.position.X + "%",
                top: data.position.Y + "%",
                width: data.size.width + "%",
                height: data.size.height + "%",
            }}
        >
            {!view && <Resizer onMouseDown={onMouseDownResizer} />}
            <span className="name">{data.name}</span>
            <p>{data.content}</p>
            {/* <span className="type">Field</span> */}
            <Background view={view} />
        </Container>
    )
}

export default FieldTag
