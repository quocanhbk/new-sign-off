/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const Container = styled.div`
    & h3 {
        font-weight: 500;
        font-size: 1.5rem;
        margin-bottom: 0.8rem;
        color: ${props => props.theme.color.fill.primary};
    }

    & li {
        margin-bottom: 1rem;
        list-style: none;
        & .feature-name {
            font-size: 1.2rem;
            margin-bottom: 2px;
        }
        & .feature-sub {
            color: ${props => props.theme.color.text.secondary};
            font-style: italic;
        }
    }
`

const FeatureSection = ({type, data}) => {
    return (
        <Container>
            <h3>{type}</h3>
            <ul>
                {data.map(d =>
                    <li key={d.name}>
                        <p className="feature-name">{d.name}</p>
                        <p className="feature-sub">{d.sub}</p>
                    </li>    
                )}
            </ul>
        </Container>
    )
}

export default FeatureSection