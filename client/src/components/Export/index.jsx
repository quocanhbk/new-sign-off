import React from 'react';
import styled from 'styled-components';
import { Router } from '@reach/router';
import Export from './Export';

const Container = styled.div`
  background-color: white;
  color: black;
  width: 21cm;
  /* height: 29.7cm; */
  padding: 0.5cm;
  position: relative;
  border-left: 1px solid black;
  border-right: 1px solid black;
  overflow: auto;
  display: block;
`;

const Playground = () => {
  return (
      <Container className="test">
        <Router>
          <Export path="/:id" />
        </Router>
      </Container>
  );
};

export default Playground;
