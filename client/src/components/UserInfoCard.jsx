import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Typography from './Typography';

const UserInfoCardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  height: 56px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-left: 8px;
  width: 80%;
`;

const DateWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const UserInfoCard = ({ showOverdue = false }) => {
  return (
    <UserInfoCardWrapper>
      <Avatar width='56px' height='56px' src="http://localhost:3600/api/v1/avatar/son.nk@ttgvn.com" />
      <UserInfoWrapper>
        <Typography.CAPTION weight='600'>Ngo Kim Son</Typography.CAPTION>
        <Typography.CAPTION>Software Developer</Typography.CAPTION>
        <DateWrapper>
          <Typography.CAPTION>Created 04/23/2021</Typography.CAPTION>
          {showOverdue && <Typography.CAPTION style={{color: 'red'}}>Overdue (1 day late)</Typography.CAPTION> }
        </DateWrapper>
      </UserInfoWrapper>
    </UserInfoCardWrapper>
  );
};

UserInfoCard.propTypes = {
  showOverdue: PropTypes.bool,
  theme: PropTypes.any,
}

export default UserInfoCard;
