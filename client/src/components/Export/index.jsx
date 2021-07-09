import React from 'react';
import styled from 'styled-components';
import { Router } from '@reach/router';
import Export from './Export';

const Container = styled.div`
  background-color: white;
  color: black;
  width: 21cm;
  height: 29.7cm;
  padding: 1cm 0.5cm;
  position: relative;
  border-left: 1px solid black;
  border-right: 1px solid black;
`;

const Playground = () => {
  return (
      <Container>
        <Router>
          <Export path="/:id" />
        </Router>
      </Container>
  );
};

export default Playground;
